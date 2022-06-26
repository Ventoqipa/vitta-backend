class ModelResponse {
    #success = false;
    #data = null;
    #error = null;

    error(data) {
        this.#success = false;
        this.#error = data;
        return this;
    }

    success(data) {
        this.#success = true;
        this.#data = data;
        return this;
    }

    serialize() {
        return {
            "done": this.#success,
            "error" : this.#error?? null,
            "data": this.#data?? null
        }
    }
}
module.exports = ModelResponse;