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

// create user rdv
router.route('/')
    .post(async (req, res, next) => {
        await db('User').insert({
            firstname: req.body.firstname,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 10),
            tel_number: req.body.tel_number
        });

        res.status(201).json('user ajouté');
    });

module.exports = router;
