const express = require('express');
const router = express.Router();
const ApiResponse = require('../Entity/Responses/api.response');
const AlarmsService = require('../Services/alarms.service');
const TextTransform = require("../Tools/text-transform.tool");

/**
 * @route GET /alarms/:id
 * @group Alarms
 * @returns {object} 200 - done: true <br> data: [{alarm data}, {alarm data}] 
 * @returns {object} 500 - done: false<br>error: 'Some error'
 * @returns {string} 403 - Not authorized, use Bearer JWT authorization
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
 * @route GET /alarms/:id
 * @group Alarms
 * @param {numeric} id.path - The id of the alarm
 * @returns {object} 200 - done: true <br> data: {alarm data}
 * @returns {object} 500 - done: false<br>error: 'Some error'
 * @returns {string} 403 - Not authorized, use Bearer JWT authorization
 */
 router.get('/:id', async (req, res) => {
    const apiResponse = new ApiResponse(res);
    try {
        const alarm = await AlarmsService.getById( req.params.id );
        if(!alarm.done) throw new Error(alarm.error);
        const alarmDetail = await AlarmsService.getRelatedData( alarm.data[0] );
        if( alarmDetail.done ) {
            apiResponse.success( alarmDetail.data );
        } else {
            apiResponse.error( alarmDetail.error );
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