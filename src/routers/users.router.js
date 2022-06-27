const express = require('express');
const router = express.Router();
const ApiResponse = require('../Entity/Responses/api.response');
const {User} = require('../Entity/Models/user.model');

/**
 * @route GET /users
 * @group Users
 * @returns {object} 200 - done: true <br> data: [{user data}, {user data}, ...]
 * @returns {object} 500 - done: false<br>error: 'Some error'
 * @returns {string} 403 - Not authorized, use Bearer JWT authorization
 */
router.get('/', async (req, res) => {
    const apiResponse = new ApiResponse(res);
    const user = new User();
    try {
        const {done, data, error} = await user.fetchAll();
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


router.post('/', (req, res) => {
    const apiResponse = new ApiResponse(res);
    apiResponse.success(req.body).sendAsJson();
});

module.exports = router;