const {Cleaning} = require('../../Tools/cleaning.tool');
const HttpException = require('http-exception');
const HttpCodes = require('../../Tools/http.tool');
class ApiResponse {
    DEFAULT_ERROR_CODE = HttpCodes.getCode( "InternalServerError" );
    DEFAULT_ERROR_MESSAGE = 'Error';
    DEFAULT_SUCCESS_MESSAGE = 'OK';
    DEFAULT_SUCCESS_CODE = HttpCodes.getCode( "Success" );

    BAD_REQUEST_CODE = 400;
    NOT_FOUND_CODE = 404;

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

    badRequest(entryData) {
        this.#success = false;
        this.#code = this.BAD_REQUEST_CODE;
        this.#data = entryData || 'Bad request';
        return this;
    }

    notFound(resource) {
        this.#success = false;
        this.#code = this.NOT_FOUND_CODE;
        this.#data = resource || 'Not found';
        return this;
    }


    buildHttpError(error) {
        if(error instanceof HttpException) {
            this.error( HttpCodes.getValue( error.code ), error.code);
        } else this.error( error.message );
        return this;
    }

    

    #serialize() {
        return {
            "done": this.#success,
            "error" : this.#error?? null,
            "data": this.#data?? null
        }
    }

    sendAsJson() {
        this.#response?.status(this.#code);
        const data = this.#serialize();
        this.#response?.json( Cleaning.cleanNulls(data) );
    }
}
module.exports = ApiResponse;