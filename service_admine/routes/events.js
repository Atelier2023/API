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
        user: process.env.MARIADB_USER,
        password: process.env.MARIADB_PASSWORD,
        database: process.env.MARIADB_DATABASE
    }
});

router.route('/')
    .patch(methodNotAllowed)
    .delete(methodNotAllowed)
    .put(methodNotAllowed)
    .post(methodNotAllowed)
    .get(function (req, res, next) {

        knex.from('Event')
            .select('*')
            .then((Event) => {
                console.log(Event)
                if (Event == null) {
                    res.status(404).json({
                        "type": "error",
                        "error": 404,
                        "message": `ressources non disponibles`
                    });
                } else {
                    let liste_events =
                    {
                        type: "collection",
                        count: Event.length,
                        Event: Event
                    }
                    res.status(200).json(liste_events)
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
 * Description : suprime un event avec son id
 * params : id_user
 */
router.route('/eventdelete/:id')
.patch(methodNotAllowed)
.post(methodNotAllowed)
.put(methodNotAllowed)
.delete(function (req, res, next) {
    let id_events = req.params.id
    knex.from('Event').delete('*')
        .where({
            'id_events': id_events
        })
        .then((user) => {
            res.status(200).json({ data: id_events, status: "l'utilisateur a bien etait suprimer " });
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