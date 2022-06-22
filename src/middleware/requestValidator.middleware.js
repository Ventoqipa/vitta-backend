const jwt = require('jsonwebtoken');
var auth = require('basic-auth');
var compare = require('tsscmp')


const verifyToken = (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) return res.status(401).json({ error: 'Acceso denegado' });
    try {
        const verified = jwt.verify(token, process.env.AUTH_SECRET);
        req.user = verified;
        next();
    } catch (error) {
        res.status(400).json({error: 'token no es válido'});
    }
}
function check (username, password) {
    return compare(username, 'android_app') && compare(password, '123456');
}

const verifyApiKey = (req, res, next) => {
    var credentials = auth(req);
    authorized = true;
    if (!credentials) {
        res.statusCode = 403;
        authorized = false;
        res.end('Acceso denegado, por favor solicite o configure correctamente su llave de aplicación (API KEY)');
        return false;
    } 
    if(!check(credentials.name, credentials.pass)) {
        res.statusCode = 401;
        authorized = false;
        res.end('Acceso denegado, proporcione sus credenciales correctas.');
        return false;
    }
    next();     
}

module.exports = {verifyToken,verifyApiKey};