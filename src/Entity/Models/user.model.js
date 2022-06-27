const db = require('../../Tools/db-config.tool');
const ModelResponse = require('../Responses/model.response');
const UserMapper = require('../Mapper/user.mapper');
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
            return dbResponse.output();
        }
    }

    async insert(data) {
        let dbResponse = new ModelResponse();
        try {
            let userMapper = new UserMapper();
            userMapper.populate(data);
            let {inserted, detail} = await (
                    new Promise( (resolve) => {
                        db(this.#table_name).insert( userMapper.map() ).returning('id')
                            .then(inserted => {
                                resolve({inserted: true, detail: inserted});
                            })
                            .catch(error => {
                                resolve({inserted: false, detail: error.message});
                            })
                    })
            );
            if(inserted)    dbResponse.success(detail);
            else dbResponse.error(detail);
        } catch (e) {
            dbResponse.error(e.message);
        } finally {
            return dbResponse.serialize();
        }
    }
}



module.exports = User;

