const db = require('../../Tools/db-config.tool');
const ModelResponse = require('../Responses/model.response');
const GenderMapper = require('../Mapper/gender.mapper');

class Gender {    
    #table_name = 'gender';
    #protected_fields = ["id"];

    constructor() {
    }

    async fetchAll() {
        let dbResponse = new ModelResponse();
        try {
            let genderMapper = new GenderMapper();
            const genders = await db.select( genderMapper.columns(this.#protected_fields) ).from(this.#table_name);
            dbResponse.success(genders);
        } catch (e) {
            dbResponse.error(e.message);
        } finally {
            return dbResponse.output();
        }
    }

    async findBy(field, searched, excluded) {
        let dbResponse = new ModelResponse();
        try {
            dbResponse.error("Not implemented");
        } catch (e) {
            dbResponse.error(e.message);
        } finally {
            return dbResponse.serialize();
        }
    }

    async insert(data) {
        let dbResponse = new ModelResponse();
        try {
            dbResponse.error("Not implemented");
        } catch (e) {
            dbResponse.error(e.message);
        } finally {
            return dbResponse.serialize();
        }
    }
}



module.exports = Gender;

