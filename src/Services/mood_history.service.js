const ServiceResponse = require('../Entity/Responses/service.response');
const MoodHistory = require('../Entity/Models/mood_history.model');

class MoodHistoryService {

    constructor() {

    }

    async getById(searched, excluded) {
        let response = new ServiceResponse();
        try {
            const dose = new MoodHistory();
            let {done, error, data} = await dose.findBy("id", searched, excluded);
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

    async add(requestData) {
        let response = new ServiceResponse();
        try {
            const dose = new MoodHistory();
            let {done, error, data} = await dose.insert(requestData);
            if(done) response.success(data);
            else response.error(error);
        } catch (error) {
            response.error( error.message );
        } finally {
            return response.serialize();
        }
    }
}

module.exports = new MoodHistoryService();