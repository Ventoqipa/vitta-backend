const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const {ApiResponse} = require('../Entity/Responses/api.response');

router.post('/login', (req, res) => {
    const apiResponse = new ApiResponse(res);
    const token = jwt.sign({
        name: "julio.sanjuan",
        id: 1
    }, process.env.AUTH_SECRET)
    
    res.header('auth-token', token);
    apiResponse.success(token).sendAsJson();


})

module.exports = router;