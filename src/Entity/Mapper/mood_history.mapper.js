const db = require('../../Tools/db-config.tool');

class MoodHistoryMapper {    
    #id = null;
    #alarmId = null;
    #moodType = null;
    #createdAt = null;
    #updatedAt = null;

    #columns = ["id", "alarm_id", "mood_type", "created_at", "updated_at"];

    constructor() {

    }

    populate(userData) {
        let {id, alarm_id, mood_type, createdAt, updatedAt} = userData;
        this.#id = id??null;
        this.#alarmId = alarm_id??null;
        this.#moodType = mood_type??null;
        this.#createdAt = createdAt??null;
        this.#updatedAt = updatedAt??null;
        return this;
    }

    map() {
        return {
            alarm_id:this.#alarmId??null,
            mood_type:this.#moodType??null
        }
    }

    columns(excluded = []) {
        return this.#columns.filter(column => !excluded.includes(column) );
    }

}

module.exports = MoodHistoryMapper;

