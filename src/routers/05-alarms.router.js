const express = require('express');
const router = express.Router();
const ApiResponse = require('../Entity/Responses/api.response');
const AlarmsService = require('../Services/alarms.service');
const TextTransform = require("../Tools/text-transform.tool");

/**
 * @route GET /alarms/
 * @group Alarms
 * @returns {AlarmListResponse.model} 200 - Returns the list of current alarms related to this account
 * @returns {ApiError.model} 500 - An error was occurred
 * @returns {NotAuthorization.model} 403 - Access denied
 * @returns {Unauthorized.model} 401 - Access denied
 */
 router.get('/', async (req, res) => {
    const apiResponse = new ApiResponse(res);
    try {
        const {done, data, error} = await AlarmsService.list( req.user.account );
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
 * @route GET /alarms/{id}
 * @group Alarms
 * @param {integer} id.path - The alarm id for look up - eg: 1
 * @returns {AlarmResponse.model} 200 - If found the alarm with given id, returns the alarm data
 * @returns {NotFoundError.model} 404 - Resource not found
 * @returns {ApiError.model} 500 - An error was occurred
 * @returns {NotAuthorization.model} 403 - Access denied
 * @returns {Unauthorized.model} 401 - Access denied
 */
 router.get('/:id', async (req, res) => {
    const apiResponse = new ApiResponse(res);
    try {
        const alarm = await AlarmsService.getById( req.params.id );
        if( alarm.done ) {
            const alarmDetail = await AlarmsService.getRelatedData( alarm.data[0] );
            if( alarmDetail.done ) {
                apiResponse.success( alarmDetail.data );
            } else {
                apiResponse.error( alarmDetail.error );
            }
        } else {
            apiResponse.notFound( alarm.error );
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
 * @param {AlarmInputRequest.model} json.body.required - The alarm data
 * @returns {AlarmCreatedResponse.model} 200 - Returns the id of new alarm
 * @returns {NotAuthorization.model} 403 - Access denied
 * @returns {Unauthorized.model} 401 - Access denied
 * @returns {ApiError.model} 500 - An error was occurred
 * @security basic
 */
router.post('/', async(req, res) => {
    const apiResponse = new ApiResponse(res);
    try {
        req.body.alarm["account_id"] = req.user.account;
        req.body.medicine["code"] = TextTransform.toVarName(req.body.medicine.name);
        if( !req.body.medicine.code ) {
            throw new Error("BAD_MEDICINE_NAME");
        }
        req.body.illness["code"] = TextTransform.toVarName(req.body.illness.name);
        if( !req.body.illness.code ) {
            throw new Error("BAD_ILLNESS_NAME");
        }

        const {done, error, data} = await AlarmsService.add(req.body);
        if( done ) {
            apiResponse.success(data);
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