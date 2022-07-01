const db = require('../../Tools/db-config.tool');

class AlarmMapper {    
    #id = null;
    #accountId = null;
    #illnessType = null;
    #medicineId = null;
    #createdAt = null;
    #updatedAt = null;

    #columns = ["id", "account_id", "illness_type", "medicine", "created_at", "updated_at"];

    constructor() {

    }

    populate(userData) {
        let {id, account_id, illness_type, medicine_id, createdAt, updatedAt} = userData;
        this.#id = id??null;
        this.#accountId = account_id??null;
        this.#illnessType = illness_type??null;
        this.#medicineId = medicine_id??null;
        this.#createdAt = createdAt??null;
        this.#updatedAt = updatedAt??null;
        return this;
    }

    map() {
        return {
            account_id: this.#accountId,
            illness_type: this.#illnessType,
            medicine: this.#medicineId
        }
    }

    columns(excluded = []) {
        return this.#columns.filter(column => !excluded.includes(column) );
    }

}

module.exports = AlarmMapper;

