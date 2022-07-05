const db = require('../../Tools/db-config.tool');
const ModelResponse = require('../Responses/model.response');
const MapperFactory = require('../Factory/mapper.factory');

class GenericModel {    
    TABLES_MAP = {
        "medicines" : "medicines",
        "illnesses" : "illnesses"
    };
    #table_name = null;
    #model_name = null;
    #mapper = null;
    #protected_fields = ["id"];
    #is_available = false;
    #error = null;

    constructor(modelName) {
        this.#model_name = modelName;
        this.#table_name = this.TABLES_MAP[ this.#model_name ];
        if(! this.#table_name)  this.#error = `Modelo ${modelName} no definido`;
        const {done, data, error} = MapperFactory.build(this.#table_name);
        this.#is_available = done;
        this.#mapper = data;
        this.#error = done? this.#error : error;
    }

    async fetchAll() {
        let dbResponse = new ModelResponse();
        try {
            if(!this.#is_available){
                throw new Error(this.#error);
            }
            const rows = await db.select( this.#mapper.columns(this.#protected_fields) ).from(this.#table_name);
            dbResponse.success(rows);
        } catch (e) {
            dbResponse.error(e.message);
        } finally {
            return dbResponse.output();
        }
    }

    async findBy(field, searched, excluded) {
        let dbResponse = new ModelResponse();
        try {
            if(typeof excluded === "undefined") excluded = this.#protected_fields;
            const columns = [...this.#mapper.columns(excluded), field];
            const alarms = await db.select( columns ).from(this.#table_name).where(field, searched);
            if(alarms)    dbResponse.success(alarms);
            else dbResponse.error(alarms);
        } catch (e) {
            dbResponse.error(e.message);
        } finally {
            return dbResponse.serialize();
        }
    }

    async insert(data) {
        let dbResponse = new ModelResponse();
        try {
            this.#mapper.populate(data);
            const columns = [...this.#mapper.columns([]), "id"];
            let {inserted, detail} = await (
                    new Promise( (resolve) => {
                        db(this.#table_name).insert( this.#mapper.map() ).returning( columns )
                            .then(inserted => {
                                resolve({inserted: true, detail: inserted});
                            })
                            .catch(error => {
                                if( error.message.includes("duplicate key value") )
                                    resolve({inserted: false, detail: "DUPLICATED_ENTRY"});
                                else
                                    resolve({inserted: false, detail: error.message});
                            })
                    })
            );
            if(inserted)    dbResponse.success(detail[0]);
            else dbResponse.error(detail);
        } catch (e) {
            dbResponse.error(e.message);
        } finally {
            return dbResponse.serialize();
        }
    }
}



module.exports = GenericModel;

