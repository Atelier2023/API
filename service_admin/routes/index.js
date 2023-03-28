const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();

// all user
router.route('/')
    .get(async (req, res, next) => {
        res.json({ message: "Home page : Index (service_admin)" })
    });
module.exports = router;
