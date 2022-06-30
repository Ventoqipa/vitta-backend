const ServiceResponse = require('../Entity/Responses/service.response');
const Account = require('../Entity/Models/account.model');

class AccountsService {

    constructor() {

    }

    async getByUserId(searched, excluded) {
        let response = new ServiceResponse();
        try {
            const account = new Account();
            let {done, error, data} = await account.findBy("user_id", searched, excluded);
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
            const account = new Account();
            let {done, error, data} = await account.insert(requestData);
            if(done) response.success(data);
            else response.error(error);
        } catch (error) {
            response.error( error.message );
        } finally {
            return response.serialize();
        }
    }
}

module.exports = new AccountsService();