const express = require('express');
const router = express.Router();
const ApiResponse = require('../Entity/Responses/api.response');
const ResourcesService = require('../Services/resources.service');
const HttpException = require('http-exception');

/**
 * @route GET /resources/{name}
 * @group Resources
 * @param {enum} name.path - The name of the resource - eg: medicines,illnesses,doses,icons
 * @returns {CatalogResponpse.model} 200 - The list of :name resource items
 * @returns {NotFoundError.model} 404 - Resource not found
 * @returns {ApiError.model} 500 - Some internal error
 * @returns {NotAuthorization.model} 403 - Access denied
 * @returns {Unauthorized.model} 401 - Access denied
 * @security basic
 */
router.get('/:name', async (req, res) => {
    const apiResponse = new ApiResponse(res);
    try {
        const {done, data, error} = await ResourcesService.list( req.params.name );
        if( done ) {
            apiResponse.success( data );
        } else {
            if( error.includes('NOT_FOUND')) throw HttpException.createError({code: 404})
            apiResponse.error( error );
        }
    } catch (failed) {
        apiResponse.buildHttpError(failed);
    } finally {
        apiResponse.sendAsJson();
    }
});

module.exports = router;