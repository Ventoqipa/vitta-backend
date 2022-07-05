const db = require('../../Tools/db-config.tool');
const ModelResponse = require('../Responses/model.response');
const MoodHistoryMapper = require('../Mapper/mood_history.mapper');

class MoodHistory {    
    #table_name = 'mood_history';
    #protected_fields = [];

    async fetchAll() {
        let dbResponse = new ModelResponse();
        try {
            let mapper = new MoodHistoryMapper();
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
            let mapper = new MoodHistoryMapper();
            if(typeof excluded === "undefined") excluded = this.#protected_fields;
            const columns = [...mapper.columns(excluded), field];
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
            let mapper = new MoodHistoryMapper();
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
            if(inserted)    dbResponse.success(detail.pop());
            else dbResponse.error(detail);
        } catch (e) {
            dbResponse.error(e.message);
        } finally {
            return dbResponse.serialize();
        }
    }
}



module.exports = MoodHistory;

