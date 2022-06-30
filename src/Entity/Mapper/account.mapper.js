
class AccountMapper {    
    #id = null;
    #userId = null;
    #accountType = null;
    #isActive = null;
    #lastLogin = null;
    #createdAt = null;
    #updatedAt = null;

    #columns = ["id", "user_id", "account_type", "is_active", "last_login", "created_at", "updated_at"];

    constructor() {

    }

    populate(accountData) {
        let {id, userId, accountType, isActive, lastLogin, createdAt, updatedAt} = accountData;
        this.#id = id??null;
        this.#userId = userId??null;
        this.#accountType = accountType??null;
        this.#isActive = isActive??false;
        this.#lastLogin = lastLogin?? new Date();
        this.#createdAt = createdAt??null;
        this.#updatedAt = updatedAt??null;
        return this;
    }

    map() {
        return {
            user_id: this.#userId,
            account_type: this.#accountType,
            is_active: this.#isActive,
            last_login: this.#lastLogin
        }
    }

    columns(excluded = []) {
        return this.#columns.filter(column => !excluded.includes(column) );
    }

}


module.exports = AccountMapper;

