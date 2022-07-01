const db = require('../../Tools/db-config.tool');
const ModelResponse = require('../Responses/model.response');
const DoseMapper = require('../Mapper/dose.mapper');

class Dose {    
    #table_name = 'doses';
    #protected_fields = [];

    async fetchAll() {
        let dbResponse = new ModelResponse();
        try {
            let userMapper = new UserMapper();
            const users = await db.select( userMapper.columns(this.#protected_fields) ).from(this.#table_name);
            dbResponse.success(users);
        } catch (e) {
            dbResponse.error(e.message);
        } finally {
            return dbResponse.output();
        }
    }

    async findBy(field, searched, excluded) {
        let dbResponse = new ModelResponse();
        try {
            let userMapper = new UserMapper();
            if(typeof excluded === "undefined") excluded = this.#protected_fields;
            const columns = [...userMapper.columns(excluded), field];
            const user = await db.select( columns ).from(this.#table_name).where(field, searched).first();
            if(user)    dbResponse.success(user);
            else dbResponse.error(detail);
        } catch (e) {
            dbResponse.error(e.message);
        } finally {
            return dbResponse.serialize();
        }
    }

    async insert(data) {
        let dbResponse = new ModelResponse();
        try {
            let mapper = new DoseMapper();
            mapper.populate(data);
            let {inserted, detail} = await (
                    new Promise( (resolve) => {
                        db(this.#table_name).insert( mapper.map() ).returning('id')
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



module.exports = Dose;

