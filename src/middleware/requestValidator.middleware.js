const jwt = require('jsonwebtoken');
const auth = require('basic-auth');
const compare = require('tsscmp');
const HttpException = require('http-exception');
const ApiResponse = require('../Entity/Responses/api.response');


const verifyToken = (req, res, next) => {
    const apiResponse = new ApiResponse(res);
    const token = req.header('authorization');
    try {
        if (!token) throw HttpException.createError({code: 403});
        const cleanToken = token.split('Bearer').pop().trim();
        if(!cleanToken || !cleanToken.length) throw HttpException.createError({code:403 });
        const verified = jwt.verify(cleanToken, process.env.AUTH_SECRET);
        req.user = verified;
        next();
    } catch (error) {
        let httpError = null;
        if(error instanceof jwt.JsonWebTokenError)  httpError = HttpException.createError({code: 401});
        else httpError = error;
        apiResponse.buildHttpError( httpError ).sendAsJson();
    }
}
function check (username, password) {
    return compare(username, 'android_app') && compare(password, '123456');
}

const verifyApiKey = (req, res, next) => {
    const apiResponse = new ApiResponse(res);
    try {
        var credentials = auth(req);
        if (!credentials) throw HttpException.createError({code: 403});
        if(!check(credentials.name, credentials.pass)) throw HttpException.createError({code: 401});
        next();
    } catch (error) {
        apiResponse.buildHttpError( error ).sendAsJson();
    }
}

module.exports = {verifyToken,verifyApiKey};