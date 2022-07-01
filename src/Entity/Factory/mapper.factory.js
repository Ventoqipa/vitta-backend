const Gender = require("../Models/gender.model");
const ModelResponse = require('../Responses/model.response');
const MedicineMapper = require('../Mapper/medicine.mapper');

class MapperFactory {    
    /**
     * @var {list} LIST List of available mappers to factory with
     */
    #LIST = {
        "medicine" : {"className": MedicineMapper, "params": []}
    }

    /**
     * @var {string} mappers List of instanced models
     */
    #mappers = {};

    /**
     * 
     * @param {string} modelName
     * @returns {any|null} If exists returns the specied model, if not, creates and return it
     */
    build( modelName ) {
        const response = new ModelResponse();
        try {
            let model = this.#mappers[ modelName ];
            if(!model) {
                const mapperData = this.#LIST[ modelName ];
                this.#mappers[ modelName ] = new mapperData[ "className" ]( mapperData[ "params" ] );
            } 
            response.success(this.#mappers[ modelName ] );
        } catch (error) {
            response.error(error.message );
        } finally {
            return response.serialize();
        }
    }

}

module.exports = new MapperFactory();

