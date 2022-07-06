const ServiceResponse = require('../Entity/Responses/service.response');
const Alarm = require('../Entity/Models/alarm.model');
const DosesService = require('../Services/doses.service');
const GenericService = require('../Services/generic.service');
const MoodHistoryService = require('../Services/mood_history.service');
const ResourcesService = require('../Services/resources.service');
const AlarmData = require('../Entity/Responses/data_structures/alarm.structure');

class AlarmsService {

    constructor() {

    }

    async list(accontId) {
        let response = new ServiceResponse();
        try {
            const alarm = new Alarm();
            let alarms = await alarm.findBy("account_id", accontId);
            response.success(alarms);
        } catch (error) {
            response.error(error.message);
        } finally{
            return response.serialize();
        }
    }

    async getById(searched, excluded) {
        let response = new ServiceResponse();
        try {
            const alarm = new Alarm();
            let {done, error, data} = await alarm.findBy("id", searched, excluded);
            if(done) {
                if(typeof data == null) response.error(error);
                else response.success(data);
            }
            else response.error(error);
        } catch (error) {
            response.error( error.message );
        } finally {
            return response.serialize();
        }
    }

    async add( requestData ) {
        let response = new ServiceResponse();
        try {
            const medicineService = new GenericService("medicines");
            const medicineAdded = await medicineService.add(requestData.medicine);
            if(!medicineAdded.done) {
                if(medicineAdded.error.includes("DUPLICATED")) {
                    requestData.alarm["medicine_code"] = requestData.medicine.code;
                } else throw new Error(medicineAdded.error);
            } else  requestData.alarm["medicine_code"] = medicineAdded.data.code;

            const illnessService = new GenericService("illnesses");
            const illnessAdded = await illnessService.add(requestData.illness);
            if(!illnessAdded.done) {
                if(illnessAdded.error.includes("DUPLICATED")) {
                    requestData.alarm["illness_code"] = requestData.illness.code;
                } else throw new Error(illnessAdded.error);
            } else  requestData.alarm["illness_code"] = illnessAdded.data.code;

            const alarm = new Alarm();
            const alarmAdded = await alarm.insert( requestData.alarm );
            
            if(!alarmAdded.done) { throw new Error(alarmAdded.error); }

            requestData.mood = {
                ...requestData.mood,
                "alarm_id" : alarmAdded.data.id,
                "mood_type" : requestData.mood.type
            }
            const moodHistoryAdded = await MoodHistoryService.add( requestData.mood );
            if(!moodHistoryAdded.done) throw new Error(moodHistoryAdded.error);
            
            requestData.dose = {
                ...requestData.dose,
                "alarm_id" : alarmAdded.data.id,
                "first_take" : requestData.alarm.first_take
            }
            const doseAdded = await DosesService.add(requestData.dose );
            if(!doseAdded.done) throw new Error(doseAdded.error);

            response.success( alarmAdded.data );

        } catch (error) {
            response.error( error.message );
        } finally {
            return response.serialize();
        }
    }

    async getRelatedData( alarmData ) {
        let response = new ServiceResponse();
        try {
            const medicineService = new GenericService("medicines");
            const medicine = await medicineService.findBy("code", alarmData.medicine_code, []);
            if(!medicine.done) throw new Error(medicine.error);

            const illnessService = new GenericService("illnesses");
            const illness = await illnessService.findBy("code", alarmData.illness_code);
            if(!illness.done) throw new Error(illness.error);

            const dose = await DosesService.findBy("alarm_id", alarmData.id );
            if(!dose.done) throw new Error(dose.error);

            const [dose_type, icon_type, measurement_type] = await Promise.all([
                ResourcesService.getByValue("doses", dose.data.dose_type),
                ResourcesService.getByValue("icons", dose.data.icon_type),
                ResourcesService.getByValue("measurements", dose.data.measurement_type )
            ]);

            const alarm = AlarmData.map(
                medicine.data[0], illness.data[0], icon_type.data.data, measurement_type.data.data, dose_type.data.data , alarmData, dose.data
            );
            response.success(alarm);

        } catch (error) {
            console.error(error);
            response.error( error.message );
        } finally {
            return response.serialize();
        }
    }
}

module.exports = new AlarmsService();