class Response {
    #success = false;
    #data = null;
    #error = null;

    serialize() {
        return {
            "done": this.#success,
            "error" : this.#error?? null,
            "data": this.#data?? null
        }
    }
}
module.exports = Response;