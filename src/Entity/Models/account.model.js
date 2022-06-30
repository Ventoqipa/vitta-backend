const db = require('../../Tools/db-config.tool');
const ModelResponse = require('../Responses/model.response');
const AccountMapper = require('../Mapper/account.mapper');

class Account {    
    #table_name = 'accounts';
    #protected_fields = ["id"];


    async findBy(field, searched, excluded) {
        let dbResponse = new ModelResponse();
        try {
            let mapper = new AccountMapper();
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
            let mapper = new AccountMapper();
            mapper.populate(data);
            let {inserted, detail} = await (
                    new Promise( (resolve) => {
                        db(this.#table_name).insert( mapper.map() ).returning('id')
                            .then(inserted => {
                                resolve({inserted: true, detail: inserted});
                            })
                            .catch(error => {
                                resolve({inserted: false, detail: error});
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



module.exports = Account;

