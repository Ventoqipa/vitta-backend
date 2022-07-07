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

    async getById(searched, excluded) {
        let response = new ServiceResponse();
        try {
            const user = new User();
            let {done, error, data} = await user.findBy("id", searched, excluded);
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

    async getByEmail(searched) {
        let response = new ServiceResponse();
        try {
            const user = new User();
            let {done, error, data} = await user.findBy("email", searched);
            if(done) {
                if(!data) response.error("NOT_FOUND")
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

module.exports = new UsersService();