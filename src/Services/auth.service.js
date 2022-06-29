const ServiceResponse = require('../Entity/Responses/service.response');
const User = require('../Entity/Models/user.model');

class AuthService {

    constructor() {

    }

    async authenticate() {
        let response = new ServiceResponse();
        try {
            const user = new User();
            let allUsers = await user.fetchAll();
            response.success(allUsers);
        } catch (error) {
            response.error(error.message);
        } finally{
            return response.serialize();
        }
    }

    async destroy(requestData) {
        let response = new ServiceResponse();
        try {
            response.error( new Error('Not implemented') );
        } catch (error) {
            response.error( error.message );
        } finally {
            return response.serialize();
        }
    }

}

module.exports = new AuthService();