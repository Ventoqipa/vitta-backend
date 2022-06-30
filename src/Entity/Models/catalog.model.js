const db = require('../../Tools/db-config.tool');
const ModelResponse = require('../Responses/model.response');
const CatalogMapper = require('../Mapper/catalog.mapper');

class Catalog {    
    #table_name = null;
    #protected_fields = ["id"];

    constructor(modelName) {
        this.#table_name = modelName;
    }   

    async fetchAll() {
        let dbResponse = new ModelResponse();
        try {
            let catalogMapper = new CatalogMapper();
            const items = await db.select( catalogMapper.columns(this.#protected_fields) ).from(this.#table_name);
            dbResponse.success(items);
        } catch (e) {
            dbResponse.error(e.message);
        } finally {
            return dbResponse.output();
        }
    }
}



module.exports = Catalog;

