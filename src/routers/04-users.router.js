const express = require('express');
const router = express.Router();
const ApiResponse = require('../Entity/Responses/api.response');
const UsersService = require('../Services/users.service');
const PasswordManager =  require('../Services/password.service');
const AccountService = require('../Services/accounts.service');

/**
 * @route GET /users
 * @group Users
 * @returns {UserListResponse.model} 200 - Returns the list of current users
 * @returns {ApiError.model} 500 - An error was occurred
 * @returns {NotAuthorization.model} 403 - Access denied
 * @returns {Unauthorized.model} 401 - Access denied
 */
router.get('/', async (req, res) => {
    const apiResponse = new ApiResponse(res);
    try {
        const {done, data, error} = await UsersService.listUsers();
        if( done ) {
            apiResponse.success( data );
        } else {
            apiResponse.error(error);
        }
    } catch (failed) {
        apiResponse.error(failed.message);
    } finally {
        apiResponse.sendAsJson();
    }
});

/**
 * @route GET /users/{id}
 * @group Users
 * @param {integer} id.path - The user id for look up - eg: 1
 * @returns {UserResponse.model} 200 - If found the user with given id, returns the user data
 * @returns {NotFoundError.model} 404 - Resource not found
 * @returns {ApiError.model} 500 - An error was occurred
 * @returns {NotAuthorization.model} 403 - Access denied
 * @returns {Unauthorized.model} 401 - Access denied
 */
 router.get('/:id', async (req, res) => {
    const apiResponse = new ApiResponse(res);
    try {
        const {done, data, error} = await UsersService.getById( req.params.id );
        if( done ) {
            apiResponse.success( data );
        } else {
            apiResponse.error(error);
        }
    } catch (failed) {
        apiResponse.error(failed.message);
    } finally {
        apiResponse.sendAsJson();
    }
});

/**
 * @route POST /users
 * @group Users
 * @param {UserInputRequest.model} json.body.required - The user data
 * @returns {UserInputResponse.model} 200 - Returns the id of new user
 * @returns {NotAuthorization.model} 403 - Access denied
 * @returns {Unauthorized.model} 401 - Access denied
 * @returns {ApiError.model} 500 - An error was occurred
 * @security basic
 */
router.post('/', async(req, res) => {
    const apiResponse = new ApiResponse(res);
    try {
        const encrypted = PasswordManager.encrypt( req.body.password );
        if( !encrypted.done )   throw new Error( encrypted.error );
        const {done, data, error} = await UsersService.addUser( {...req.body, "password" : encrypted.data } );
        if( done ) {
            const userId = data[0]?.id??null;
            const created = await AccountService.add( {
                userId : userId,
                accountType: 2,
                isActive: true
            } );
            if(created.done) {
                apiResponse.success( data.pop() );
            } else {
                apiResponse.error(created.error);
            }
        } else {
            apiResponse.error(error);
        }
    } catch (failed) {
        apiResponse.error(failed.message);
    } finally {
        apiResponse.sendAsJson();
    }
});

module.exports = router;