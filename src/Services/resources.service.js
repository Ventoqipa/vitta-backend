const ServiceResponse = require('../Entity/Responses/service.response');

const ModelFactory = require('../Entity/Factory/model.factory');

class ResourcesService {

    constructor() {

    }

    async list(resourceName) {
        let response = new ServiceResponse();
        try {
            const model = ModelFactory.build( resourceName );
            if(!model.done) {
                response.error(model.error);
            }  else {
                response.success( (await model.data.fetchAll()) );
            }
        } catch (error) {
            response.error(error.message);
        } finally{
            return response.serialize();
        }
    }

    async getByValue(resourceName, searched) {
        let response = new ServiceResponse();
        try {
            const model = ModelFactory.build( resourceName );
            if(!model.done) {
                response.error(model.error);
            }  else {
                response.success( (await model.data.findBy("value", searched)) );
            }
        } catch (error) {
            response.error(error.message);
        } finally{
            return response.serialize();
        }
    }


}

module.exports = new ResourcesService();