const ServiceResponse = require('../Entity/Responses/service.response');
const Dose = require('../Entity/Models/dose.model');

class DosesService {

    constructor() {

    }

    async getById(searched, excluded) {
        let response = new ServiceResponse();
        try {
            const dose = new Dose();
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
            const dose = new Dose();
            let {done, error, data} = await dose.insert(requestData);
            if(done) response.success(data);
            else response.error(error);
        } catch (error) {
            response.error( error.message );
        } finally {
            return response.serialize();
        }
    }

    async findBy(field, searched, excluded) {
        let response = new ServiceResponse();
        try {
            const model = new Dose();
            let {done, error, data} = await model.findBy(field, searched, excluded);
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
}

module.exports = new DosesService();