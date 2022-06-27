const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const ApiResponse = require('../Entity/Responses/api.response');

/**
 * @route GET /
 * @group Health check
 * @returns {ApiResponse} 200 - done: true,<br> data: {api info}
 */
 router.get('/', (req, res) => {
    const accepted = req.accepts(["json","html"]);
    if(accepted.includes("html"))
        res.sendFile( path.join(__dirname, 'index.html') );
    else if(accepted.includes("json")){
        const response = new ApiResponse(res);
        response.success( {
        "name" : 'Vitta API',
        "version" : "0.1.0",
        "owner" : "Ventoqipa"
        } );
        response.sendAsJson();
        //res.sendFile( path.join(__dirname, 'index.json') );
    }
    else
        res.sendStatus(406);
});

module.exports = router;