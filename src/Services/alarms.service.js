const ServiceResponse = require('../Entity/Responses/service.response');
const Alarm = require('../Entity/Models/alarm.model');
const DosesService = require('../Services/doses.service');
const GenericService = require('../Services/generic.service');
const MoodHistoryService = require('../Services/mood_history.service');

class AlarmsService {

    constructor() {

    }

    async getByAccountId(searched, excluded) {
        let response = new ServiceResponse();
        try {
            const account = new Account();
            let {done, error, data} = await account.findBy("account_id", searched, excluded);
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
            
            response.success(alarmAdded.data);
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
}

module.exports = new AlarmsService();