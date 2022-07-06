const db = require('../../Tools/db-config.tool');

class AlarmMapper {    
    #id = null;
    #accountId = null;
    #illnessCode = null;
    #medicineCode = null; 
    #createdAt = null;
    #updatedAt = null;

    #columns = ["id", "account_id", "illness_code", "medicine_code", "active", "created_at", "updated_at"];

    constructor() {

    }

    populate(userData) {
        let {id, account_id, illness_code, medicine_code, createdAt, updatedAt} = userData;
        this.#id = id??null;
        this.#accountId = account_id??null;
        this.#illnessCode = illness_code??null;
        this.#medicineCode = medicine_code??null;
        this.#createdAt = createdAt??null;
        this.#updatedAt = updatedAt??null;
        return this;
    }

    map() {
        return {
            account_id: this.#accountId,
            illness_code: this.#illnessCode,
            medicine_code: this.#medicineCode
        }
    }

    columns(excluded = []) {
        return this.#columns.filter(column => !excluded.includes(column) );
    }

}

module.exports = AlarmMapper;

