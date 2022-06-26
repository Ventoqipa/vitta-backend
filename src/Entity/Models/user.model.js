const db = require('../../Tools/db-config.tool')
const ModelResponse = require('../Responses/model.response')
class User {    
    #table_name = 'users';
    constructor() {
    }

    async fetchAll() {
        let dbResponse = new ModelResponse();
        try {
            const users = await db.select().from(this.#table_name);
            dbResponse.success(users);
        } catch (e) {
            dbResponse.error(e.message);
        } finally {
            return dbResponse.serialize();
        }
    }   
}

module.exports = {User}

