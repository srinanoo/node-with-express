const express = require('express');
const router = express.Router();

router.get('/show', (req, res)=> {
    res.send("This is the main Teachers route");
});

router.get('/create', (req, res)=> {
    res.send("This is the main Teacher route to create Teachers");
});

module.exports = router;