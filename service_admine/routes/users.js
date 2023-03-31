const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;

const methodNotAllowed = require('../errors/methodNotAllowed.js');

const knex = knex({
    client: 'mysql',
    connection: {
        host: process.env.MARIADB_HOST,
        port: 3306,
        User: process.env.MARIADB_USER,
        password: process.env.MARIADB_PASSWORD,
        database: process.env.MARIADB_DATABASE
    }
});

/**
 * Route : /Users
 * Méthode : GET
 * Description : récupération de tous les Users 
 * retour : JSON de la liste de tous les Users
 */
router.route('/')
    .patch(methodNotAllowed)
    .delete(methodNotAllowed)
    .put(methodNotAllowed)
    .post(methodNotAllowed)
    .get(function (req, res, next) {
        knex.from('User')
            .select('*')
            .then((Users) => {
                console.log(Users)
                if (Users == null) {
                    res.status(404).json({
                        "type": "error",
                        "error": 404,
                        "message": `ressources non disponibles`
                    });
                } else {
                    let liste_Users =
                    {
                        type: "collection",
                        count: Users.length,
                        Users: Users
                    }
                    res.status(200).json(liste_Users)
                }
            }).catch((err) => {
                res.status(500).json({
                    "type": "error",
                    "error": 500,
                    "message": `Erreur de connexion à la base de données ` + err
                });
            })

    })

/**
 * Route : /delete
 * Méthode : DELETE
 * Description : suprime un User avec son id
 * params : id_User

 */
router.route('/delete/:id')
    .patch(methodNotAllowed)
    .post(methodNotAllowed)
    .put(methodNotAllowed)
    .delete(function (req, res, next) {

        knex.from('User').delete('*')
            .where({
                'id_User': req.params.id
            })
            .then((User) => {

                res.status(200).json({ data: User, status: "l'utilisateur a bien etait suprimer " });
            })
            .catch((err) => {
                res.status(500).json({
                    "type": "error",
                    "error": 500,
                    "message": `Erreur de connexion à la base de données ` + err
                });
            })
    })
    .get(methodNotAllowed)


module.exports = router;
