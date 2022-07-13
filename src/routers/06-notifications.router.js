const express = require('express');
const router = express.Router();
const ApiResponse = require('../Entity/Responses/api.response');
const NotificationsService = require('../Services/notifications.service');


 router.get('/', async (req, res) => {
    const apiResponse = new ApiResponse(res);
    try {
        const {done, error, data} = await NotificationsService.listTopics();
        if(!done) throw new Error(error);
        apiResponse.success(data);
    } catch (failed) {
        apiResponse.buildHttpError(failed.message);
    } finally {
        apiResponse.sendAsJson();
    }
});


router.post('/', async(req, res) => {
    const apiResponse = new ApiResponse(res);
    try {
        const {subject, message} = req.body;
        const {done, error, data} = await NotificationsService.publishEmail(subject, message);
        if(!done) throw new Error(error);
        apiResponse.success(data);
    } catch (failed) {
        apiResponse.error(failed.message);
    } finally {
        apiResponse.sendAsJson();
    }
});

module.exports = router;