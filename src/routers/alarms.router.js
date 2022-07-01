const express = require('express');
const router = express.Router();
const ApiResponse = require('../Entity/Responses/api.response');
const AlarmsService = require('../Services/alarms.service');

/**
 * @route GET /users
 * @group alarms
 * @returns {object} 200 - done: true <br> data: [{alarm data}, {alarm data}, ...]
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
 * @route GET /users/:id
 * @group Alarms
 * @param {numeric} id.path - The id of the alarm
 * @returns {object} 200 - done: true <br> data: {alarm data}
 * @returns {object} 500 - done: false<br>error: 'Some error'
 * @returns {string} 403 - Not authorized, use Bearer JWT authorization
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
 * @route POST /alarms
 * @group Alarms
 * @returns {object} 200 - done: true <br> data: [{user data}, {user data}, ...]
 * @returns {object} 500 - done: false<br>error: 'Some error'
 * @returns {string} 403 - Not authorized, use Bearer JWT authorization
 */
router.post('/', async(req, res) => {
    const apiResponse = new ApiResponse(res);
    try {
        

        /*const encrypted = PasswordManager.encrypt( req.body.password );
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
        } */
    } catch (failed) {
        apiResponse.error(failed.message);
    } finally {
        apiResponse.sendAsJson();
    }
});

module.exports = router;