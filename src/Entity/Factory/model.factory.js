const Gender = require("../Models/gender.model");
const ModelResponse = require('../Responses/model.response');
const Catalog = require('../Models/catalog.model');

class ModelFactory {    
    /**
     * @var {list} LIST List of available models to factory with
     */
    #LIST = {
        "gender" : {"className": Gender, "params": []},
        "account" : {"className": Catalog, "params": ["account_types"]}
    }

    /**
     * @var {string} models List of instanced models
     */
    #models = {};

    /**
     * 
     * @param {string} modelName
     * @returns {any|null} If exists returns the specied model, if not, creates and return it
     */
    build( modelName ) {
        const response = new ModelResponse();
        try {
            let model = this.#models[ modelName ];
            if(!model) {
                const modelData = this.#LIST[ modelName ];
                this.#models[ modelName ] = new modelData[ "className" ]( modelData[ "params" ] );
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

