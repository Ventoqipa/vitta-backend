const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const ApiResponse = require('../Entity/Responses/api.response');
const UsersService = require('../Services/users.service');
const PasswordManager =  require('../Services/password.service');
const AccountsService = require('../Services/accounts.service');
const HttpException = require('http-exception')

/**
 * @route POST /auth/login
 * @group Auth
 * @param {LoginInput.model} json.body.required - The user mail and password
 * @returns {TokenResponse.model} 200 - Returns the JWT token
 * @returns {ApiError.model} 500 - An error was occurred
 * @returns {NotAuthorization.model} 403 - Access denied
 * @returns {Unauthorized.model} 401 - Access denied
 * @security basic
 */
router.post('/login', async(req, res) => {
    const apiResponse = new ApiResponse(res);
    try {
        const {done, data, error} = await UsersService.getByEmail( req.body.username );
        if(!done) {
            if(error.includes("NOT_FOUND")) 
                throw HttpException.createError({code: 404, message: "Not Found", status: 404});
            else throw new Error(error);
        }
        const user = await UsersService.getById( data.id, ['id'] );
        const matchPassword = PasswordManager.compare( req.body.password, user.data.password );
        if( !matchPassword.done ) {
            throw new Error(matchPassword.error);
        }
        const account = await AccountsService.getByUserId( user.data.id, [] );
        if(!account.done) {
            throw new Error(account.error);
        }
        const token = jwt.sign({
            email: user.data.email,
            id: user.data.id,
            account: account.data.id
        }, process.env.AUTH_SECRET);
        
        res.header('Authorized-Token', token);

        apiResponse.success( token );

    } catch (error) {
        apiResponse.error( error.message );
    } finally {
        apiResponse.sendAsJson();
    }
})

module.exports = router;