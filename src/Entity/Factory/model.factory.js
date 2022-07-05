const Gender = require("../Models/gender.model");
const ModelResponse = require('../Responses/model.response');
const Catalog = require('../Models/catalog.model');
const GenericModel = require('../Models/generic.model');

class ModelFactory {    
    /**
     * @var {list} LIST List of available models to factory with
     */
    #LIST = {
        "genders" : {"className": Gender, "params": []},
        "accounts" : {"className": Catalog, "params": ["account_types"]},
        "illnesses" : {"className": GenericModel, "params": ["illnesses"]},
        "medicines" : {"className": GenericModel, "params": ["medicines"]},
        "moods" : {"className": Catalog, "params": ["mood_types"]},
        "measurements" : {"className": Catalog, "params": ["measurement_types"]},
        "icons" : {"className": Catalog, "params": ["icon_types"]},
        "actions" : {"className": Catalog, "params": ["action_types"]},
        "doses" : {"className": Catalog, "params": ["dose_types"]}, 
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

