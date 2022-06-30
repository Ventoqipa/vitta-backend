class GenderMapper {    
    #id = null;
    #value = null;
    #label = null;

    #columns = ["id", "value", "label"];

    populate(genderData) {
        let {id, value, label} = genderData;
        this.#id = id??null;
        this.#value = value??null;
        this.#label = label??null;
        
        return this;
    }

    map() {
        return {
            value: this.#value,
            label: this.#label
        }
    }

    columns(excluded = []) {
        return this.#columns.filter(column => !excluded.includes(column) );
    }

}

module.exports = GenderMapper;

