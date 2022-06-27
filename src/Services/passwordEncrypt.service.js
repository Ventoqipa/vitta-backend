require('dotenv').config();
const aes256 = require('aes256');
const ServiceResponse = require('../Entity/Responses/service.response');

class PasswordManager {
    MIN_PASSWORD_LENGTH = 5;

    #cipher = null;

    constructor() {
        this.#cipher = aes256.createCipher( process.env.AES256_PASSPHRASE );
    }

    validate(password) {
        if(!password
            || !password.length < this.MIN_PASSWORD_LENGTH
        ) return false;
        else return true;
    }

    encrypt(password) {
        const response = new ServiceResponse();
        try {
            if( !this.validate() ) {
                response.error( "Invalid password" );
            } else {
                response.success( this.#cipher.encrypt( password ) );
            }
        } catch (error) {
            response.error( error.message );
        } finally {
            return response.serialize();
        }
    }

    #decrypt(encrypted) {
        const response = new ServiceResponse();
        try {
            response.success( this.#cipher.decrypt( encrypted ) );
        } catch (error) {
            response.error( error.message );
        } finally {
            return response.serialize();
        }
    }

    compare(password, encrypted) {
        const response = new ServiceResponse();
        const decrypted = this.#decrypt(encrypted);
        if(decrypted.done) {
            if(decrypted.data === password){
                return response.success(password).serialize();
            } else {
                return response.success("Password does not match.").serialize();
            }
        } else {
            return response.error(password).serialize();
        }
    }

}

module.exports = PasswordManager;