const Gender = require("../Models/gender.model");
const ModelResponse = require('../Responses/model.response');

class ModelFactory {    
    /**
     * @var {list} LIST List of available models to factory with
     */
    #LIST = {
        "gender" : Gender
    }

    /**
     * @var {string} models List of instanced models
     */
    #models = {};

    /**
     * 
     * @param {string} modelName
     * @returns {any|null} The resource model
     */
    build( modelName ) {
        const response = new ModelResponse()
        try {
            let model = this.#models[ modelName ];
            if(!model) {
                this.#models[ modelName ] = new this.#LIST[ modelName ]();
            } 
            response.success(this.#models[ modelName ] );
        } catch (error) {
            response.error(error.message );
        } finally {
            return response.serialize();
        }
    }

}

module.exports = new ModelFactory();

