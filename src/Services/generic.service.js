const ServiceResponse = require('../Entity/Responses/service.response');
const GenericModel = require('../Entity/Models/generic.model');

class GenericService {
    #service = null;
    constructor(serviceName) {
        this.#service = serviceName;
    }

    async findBy(field, searched, excluded) {
        let response = new ServiceResponse();
        try {
            const model = new GenericModel(this.#service);
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

    async add(dataToInsert) {
        let response = new ServiceResponse();
        try {
            const model = new GenericModel(this.#service);
            let {done, error, data} = await model.insert(dataToInsert);
            if(done) response.success(data);
            else response.error(error);
        } catch (error) {
            response.error( error.message );
        } finally {
            return response.serialize();
        }
    }
}

module.exports = GenericService;