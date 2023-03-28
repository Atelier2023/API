const express = require('express');
const bcrypt = require('bcrypt');
const knex = require('knex');
const router = express.Router();

const db = knex({
    client: 'mysql',
    connection: {
        host: process.env.MARIADB_HOST,
        port: 3306,
        user: process.env.MARIADB_USER,
        password: process.env.MARIADB_PASSWORD,
        database: process.env.MARIADB_DATABASE
    }
});  

// get all users
router.route('/')
    .get(async (req, res, next) => {
        const users = await db('User').select();
        res.status(200).json(users);
    });

module.exports = router;
