const db = require('../../Tools/db-config.tool');
const ModelResponse = require('../Responses/model.response');
const AlarmMapper = require('../Mapper/alarm.mapper');

class Alarm {    
    #table_name = 'alarms';
    #protected_fields = [];

    async fetchAll() {
        let dbResponse = new ModelResponse();
        try {
            let mapper = new AlarmMapper();
            const users = await db.select( mapper.columns(this.#protected_fields) ).from(this.#table_name);
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
            let mapper = new AlarmMapper();
            if(typeof excluded === "undefined") excluded = this.#protected_fields;
            const columns = [...mapper.columns(excluded), field];
            const alarms = await db.select( columns ).from(this.#table_name).where(field, searched);
            if(alarms)    dbResponse.success(alarms);
            else dbResponse.error(alarms);
        } catch (e) {
            dbResponse.error(e.message);
        } finally {
            return dbResponse.serialize();
        }
    }

    async insert(data) {
        let dbResponse = new ModelResponse();
        try {
            let mapper = new AlarmMapper();
            userMapper.populate(data);
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



module.exports = Alarm;

