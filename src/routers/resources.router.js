const express = require('express');
const router = express.Router();
const ApiResponse = require('../Entity/Responses/api.response');
const ResourcesService = require('../Services/resources.service');
const PasswordManager =  require('../Services/password.service');

/**
 * @route GET /resources/:name
 * @group Resources
 * @returns {object} 200 - done: true <br> data: [{value, label}, {value, label}, ...]
 * @returns {object} 500 - done: false<br>error: 'Some error'
 * @returns {string} 403 - Not authorized, use Bearer JWT authorization
 */
router.get('/:name', async (req, res) => {
    const apiResponse = new ApiResponse(res);
    try {
        const {done, data, error} = await ResourcesService.list( req.params.name );
        if( done ) {
            apiResponse.success( data );
        } else {
            apiResponse.notFound( error );
        }
    } catch (failed) {
        apiResponse.error(failed.message);
    } finally {
        apiResponse.sendAsJson();
    }
});

module.exports = router;