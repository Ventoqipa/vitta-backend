const {cleaning, Cleaning} = require('../../Tools/cleaning.tool');
class ApiResponse {
    DEFAULT_ERROR_CODE = 500;
    DEFAULT_ERROR_MESSAGE = 'Error';
    DEFAULT_SUCCESS_MESSAGE = 'OK';
    DEFAULT_SUCCESS_CODE = 200;

    BAD_REQUEST_CODE = 400;

    #success = false;
    #code = null;
    #data = null;
    #error = null;
    #response = null;

    constructor(httpResponse) {
        if(!httpResponse)   console.error('httpResponse is null');
        this.#response = httpResponse;
    }

    error(data, code) {
        this.#success = false;
        this.#code = code || this.DEFAULT_ERROR_CODE;
        this.#error = data || this.DEFAULT_ERROR_MESSAGE;
        return this;
    }

    success(data) {
        this.#success = true;
        this.#code = this.DEFAULT_SUCCESS_CODE;
        this.#data = data || this.DEFAULT_SUCCESS_MESSAGE;
        return this;
    }

    sendAsJson() {
        this.response?.status(this.#code);
        const data = {
            "done": this.#success,
            "error" : this.#error?? null,
            "data": this.#data?? null
        }
        this.#response?.json( Cleaning.cleanNulls(data) );
    }
}
module.exports = {ApiResponse};