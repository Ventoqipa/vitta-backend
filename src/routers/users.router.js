const express = require('express');
const router = express.Router();
const ApiResponse = require('../Entity/Responses/api.response');
const UsersService = require('../Services/users.service');

/**
 * @route GET /users
 * @group Users
 * @returns {object} 200 - done: true <br> data: [{user data}, {user data}, ...]
 * @returns {object} 500 - done: false<br>error: 'Some error'
 * @returns {string} 403 - Not authorized, use Bearer JWT authorization
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
 * @route POST /users
 * @group Users
 * @param {string} name.required - User name
 * @param {string} email.required - User email
 * @param {string} birthday.required - User birthday in format MM-DD-YYYY
 * @param {string} gender.required - User gender in numeric value where 1 = 'male', 2 = 'female' and 0 = 'Not specified'
 * @returns {object} 200 - done: true <br> data: [{user data}, {user data}, ...]
 * @returns {object} 500 - done: false<br>error: 'Some error'
 * @returns {string} 403 - Not authorized, use Bearer JWT authorization
 */
router.post('/', async(req, res) => {
    const apiResponse = new ApiResponse(res);
    try {
        const {done, data, error} = await UsersService.addUser( req.body );
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

module.exports = router;