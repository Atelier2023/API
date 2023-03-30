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
            const result = await db('Event').select();

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

router.route('/getEvent/:id_event')
    .get(async (req, res, next) => {
        try {
            const events = await db('Event')
                .where('id_event', req.params.id_event)
                .select();

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
                before: false,
                after: false,
                state: 'coming',
            });

            res.status(201).json('event ajouté');
        } catch (error) {
            res.status(500).json({
                "type": "error",
                "error": 500,
                "message": "Erreur interne du serveur",
            })
        }
    });

//get event by id
router.route('/:id_event')
    .get(async (req, res, next) => {
        try {
            const events = await db('Event')
                .where('id_event', req.params.id_event)
                .select()
                .first();
                
            if (!events) {
                res.status(404).json({
                    "type": "error",
                    "error": 404,
                    "message": "ressource non disponible : /event/" + req.params.id_event
                });
            } else {
                const participants = await db('Participant')
                    .where('id_event', events.id_event)
                    .select();

                const result = {
                    "id_event": events.id_event,
                    "date_event": events.date_event,
                    "address": events.address,
                    "before": events.before,
                    "after": events.after,
                    "state": events.coming,
                    "id_user": events.id_user,
                    "participants": participants
                }

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

//get all events by id_user
router.route('/:id_event')
    .get(async (req, res, next) => {
        try {
            const events = await db('Event')
                .where('id_event', req.params.id_event)
                .select()
                .first();
                
            if (!events) {
                res.status(404).json({
                    "type": "error",
                    "error": 404,
                    "message": "ressource non disponible : /event/" + req.params.id_event
                });
            } else {
                const participants = await db('Participant')
                    .where('id_event', events.id_event)
                    .select();

                const result = {
                    "id_event": events.id_event,
                    "date_event": events.date_event,
                    "address": events.address,
                    "before": events.before,
                    "after": events.after,
                    "state": events.coming,
                    "id_user": events.id_user,
                    "participants": participants
                }

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

//update event by id
router.route('/update/:id_event')
    .post(async (req, res, next) => {
        try {
            const event = await db('Event')
                .where('id_event', req.params.id_event)
                .select()
                .first();

            if (!event) {
                res.status(404).json({
                    "type": "error",
                    "error": 404,
                    "message": "ressource non disponible : /event/update/" + req.params.id_event
                });
            } else {
                const result = await db('Event')
                    .where('id_event', req.params.id_event)
                    .update({
                        date_event: req.body.date_event || event.date_event,
                        address: req.body.address || event.address,
                        before: req.body.before || event.before,
                        after: req.body.after || event.after,
                        state: req.body.after || event.state
                    });

                if (!result) {
                    res.status(404).json({
                        "type": "error",
                        "error": 404,
                        "message": "ressource non disponible : /event/update/" + req.params.id_event
                    });
                } else {
                    res.status(200).json('event modifié.');
                }
            }

        } catch (error) {
            res.json({
                "type": "error",
                "error": 500,
                "message": "Erreur interne du serveur"
            });
        }
    });

//delete event by id
router.route('/delete/:id_event')
    .delete(async (req, res, next) => {
        try {
            const result = await db('Event')
                .where('id_event', req.params.id_event)
                .del();

            if (!result) {
                res.status(404).json({
                    "type": "error",
                    "error": 404,
                    "message": "ressource non disponible : /Events/delete/" + req.params.id_event
                });
            } else {
                res.status(200).json('Participant supprimé.');
            }
        } catch (error) {
            res.json({
                "type": "error",
                "error": 500,
                "message": "Erreur interne du serveur"
            });
        }
    });

module.exports = router;
