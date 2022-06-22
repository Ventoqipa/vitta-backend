const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

router.post('/login', (req, res) => {
    //res.json(req.body);
    const token = jwt.sign({
        name: "julio.sanjuan",
        id: 1
    }, process.env.AUTH_SECRET)
    
    res.header('auth-token', token).json({
        error: false,
        data: {token}
    });
})

module.exports = router;