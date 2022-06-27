const ServiceResponse = require('../Entity/Responses/service.response');
const User = require('../Entity/Models/user.model');
class UsersService {

    constructor() {

    }

    async listUsers() {
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

    async addUser(requestData) {
        let response = new ServiceResponse();
        try {
            const user = new User();
            let {done, error, data} = await user.insert(requestData);
            if(done) response.success(data);
            else response.error(error);
        } catch (error) {
            response.error( error.message );
        } finally {
            return response.serialize();
        }
    }

}

module.exports = new UsersService();