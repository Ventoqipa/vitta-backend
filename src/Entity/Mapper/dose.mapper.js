const db = require('../../Tools/db-config.tool');

class DoseMapper {    
    #id = null;
    #alarmId = null;
    #doseType = null;
    #measurementType = null;
    #iconType = null;
    #quantity = null;
    #grammage = null;
    #period = null;
    #duration = null;
    #first_take = null;
    #createdAt = null;
    #updatedAt = null;

    #columns = ["id", "alarm_id", "dose_type", "measurement_type", "icon_type", "quantity", "grammage", "period", "duration", "first_take", "created_at", "updated_at"];

    constructor() {

    }

    populate(userData) {
        let {id, alarm_id, dose_type, measurement_type, icon_type, quantity, grammage, period, duration, first_take, createdAt, updatedAt} = userData;
        this.#id = id??null;
        this.#alarmId = alarm_id??null;
        this.#doseType = dose_type??null;
        this.#measurementType = measurement_type??null;
        this.#iconType = icon_type??null;
        this.#quantity = quantity??null;
        this.#grammage = grammage??null;
        this.#period = period??null;
        this.#duration = duration??null;
        this.#first_take = first_take??null;
        this.#createdAt = createdAt??null;
        this.#updatedAt = updatedAt??null;
        return this;
    }

    map() {
        return {
            alarm_id:this.#alarmId??null,
            dose_type:this.#doseType??null,
            measurement_type:this.#measurementType??null,
            icon_type : this.#iconType??null,
            quantity:this.#quantity??null,
            grammage: this.#grammage??null,
            period: this.#period??null,
            duration: this.#duration??null,
            first_take: this.#first_take??null
        }
    }

    columns(excluded = []) {
        return this.#columns.filter(column => !excluded.includes(column) );
    }

}

module.exports = DoseMapper;

