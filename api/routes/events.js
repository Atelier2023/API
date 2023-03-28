const express = require('express');
const db = require('databaseConnection.js');
const knex = require('knex');
const router = express.Router();

// Get all rdv
router.route('/')
    .get(async (req, res, next) => {
        const test = await db('RDV')
    });

    module.exports = router;
