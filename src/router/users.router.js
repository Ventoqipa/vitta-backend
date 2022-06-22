const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
    res.json(req.user);
});

router.post('/', (req, res) => {
    res.json(req.body);
});

module.exports = router;