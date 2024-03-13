const express = require("express");
const router = express.Router();


router.get("/test-backend", (req, res, next) => {
    res.status(200).json("All good in here");
});


module.exports = router;