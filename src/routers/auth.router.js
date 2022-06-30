const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const ApiResponse = require('../Entity/Responses/api.response');
const AuthService = require('../Services/auth.service');
const UsersService = require('../Services/users.service');
const PasswordManager =  require('../Services/password.service');
const AccountsService = require('../Services/accounts.service');

/**
 * @route POST /auth/login
 * @group Auth
 * @param {string} email.required - username or email - eg: user@domain
 * @param {string} password.required - user's password.
 * @returns {object} 200 - done: true <br> data: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXV'
 * @returns {object} 500 - done: false<br>error: 'Some error'
 * @returns {string} 403 - Not authorized, use API KEY authorization
 */
router.post('/login', async(req, res) => {
    const apiResponse = new ApiResponse(res);
    try {
        const {done, data} = await UsersService.getByEmail( req.body.username );
        if(!done) {
            throw new Error("USR_NOT_FOUND")
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