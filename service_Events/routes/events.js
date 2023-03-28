const express = require('express');
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

// Get all events
router.route('/')
    .get(async (req, res, next) => {
        try {
            let result;
            if (req.query.user) {
                const events = await db('Event')
                    .where('id_user', req.query.user)
                    .groupBy('id_event')
                    .select();

                console.log(events)
                
                const eventResult = events.map(event => {
                    return {
                        "event": {
                            "id_event": event.id_event,
                            "address": event.address,
                            "state": event.state,
                            "before": event.before,
                            "after": event.after,
                            "date_event": event.date_event
                        }
                    }
                });

                result = {
                    "type": "collection",
                    "count": eventResult.length,
                    "events": eventResult
                };
            } else {
                result = await db('Event').select();
            }

            if (!result) {
                res.status(404).json({
                    "type": "error",
                    "error": 404,
                    "message": "ressource non disponible : /event"
                });
            } else {
                res.status(200).json(result);
            }
        } catch (error) {
            res.json({
                "type": "error",
                "error": 500,
                "message": "Erreur interne du serveur"
            });
        }
    });

//create event
router.route('/create')
    .post(async (req, res, next) => {
        try {
            await db('Event').insert({
                id_user: req.body.id_user,
                address: req.body.address,
                date_event: req.body.date_event,
            });

            res.status(201).json('event ajouté');
        } catch (error) {
            res.status(500).json({
                "type": "error",
                "error": 500,
                "message": "Erreur interne du serveur"
            })
        }
    });

module.exports = router;
