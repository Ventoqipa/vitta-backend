
class IllnessMapper {    
    #id = null;
    #code = null;
    #name = null;
    #createdAt = null;
    #updatedAt = null;

    #columns = ["id", "code", "name", "created_at", "updated_at"];

    constructor() {

    }

    populate(accountData) {
        let {id, code, name, createdAt, updatedAt} = accountData;
        this.#id = id??null;
        this.#code = code??null;
        this.#name = name??null;
        this.#createdAt = createdAt??null;
        this.#updatedAt = updatedAt??null;
        return this;
    }

    map() {
        return {
            code: this.#code,
            name: this.#name
        }
    }

    columns(excluded = []) {
        return this.#columns.filter(column => !excluded.includes(column) );
    }

}


module.exports = IllnessMapper;

