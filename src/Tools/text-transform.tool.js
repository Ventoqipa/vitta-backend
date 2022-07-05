class TextTransform {
    /**
     * @param {string} str 
     * @returns {string|null} The snake cased variabe-like version of given text
     */
    static toVarName(str) {
        if(!str || !str.length) return null;
        str = str.replace(/[^\w ]/g, '');
        if(!str.length) return null;
        return str.trim().toLowerCase().split(" ").join("_");
    }
}

module.exports = TextTransform;