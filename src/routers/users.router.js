const express = require('express');
const router = express.Router();
const {ApiResponse} = require('../Entity/Responses/api.response');


router.get('/', (req, res) => {
    const apiResponse = new ApiResponse(res);
    apiResponse.success(req.user).sendAsJson();
});

router.post('/', (req, res) => {
    const apiResponse = new ApiResponse(res);
    apiResponse.success(req.body).sendAsJson();
});

module.exports = router;