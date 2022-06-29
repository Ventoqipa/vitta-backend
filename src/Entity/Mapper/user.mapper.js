const db = require('../../Tools/db-config.tool');
class UserMapper {    
    #id = null;
    #name = null;
    #email = null;
    #birthday = null;
    #password = null;
    #gender = null;
    #createdAt = null;
    #updatedAt = null;

    #columns = ["id", "name", "email", "birthday", "password", "gender", "created_at", "updated_at"];

    constructor() {

    }

    populate(userData) {
        let {id, name, email, birthday, password, gender, createdAt, updatedAt} = userData;
        this.#id = id??null;
        this.#name = name??null;
        this.#email = email??null;
        this.#birthday = birthday??null;
        this.#password = password??null;
        this.#gender = gender??null;
        this.#createdAt = createdAt??null;
        this.#updatedAt = updatedAt??null;
        return this;
    }

    map() {
        return {
            name: this.#name,
            email: this.#email,
            birthday: this.#birthday,
            password: this.#password,
            gender: this.#gender
        }
    }

    columns(excluded = []) {
        return this.#columns.filter(column => !excluded.includes(column) );
    }

}



module.exports = UserMapper;

