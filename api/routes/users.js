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

// all user
router.route('/')
    .get(async (req, res, next) => {
        const users = await db('User').select();

        res.status(200).json(users);
    });

// create user
router.route('/create')
    .post(async (req, res, next) => {
        await db('User').insert({
            firstname: req.body.firstname,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 10),
            tel_number: req.body.tel_number
        });

        res.status(201).json('user ajouté');
    });

// // delete user
// router.route('/delete/:id')
//     .delete(async (req, res, next) => {
//         await db('User')
//             .where('id_user' === req.params.id)
//             .del()

//         res.status(204).json('user supprimé');
//     });

// module.exports = router;