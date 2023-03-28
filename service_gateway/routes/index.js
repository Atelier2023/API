const express = require('express');
const router = express.Router();

router.route('/')
    .get(async (req, res, next) => {
        res.status(200).json({
            "type": "ok",
            "error": 200,
            "message": `Home page of service gateway.`
          });
    });

module.exports = router;
