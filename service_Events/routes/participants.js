const express = require('express');
const knex = require('knex');
const shortid = require('shortid');
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

// Get all participants
router.route('/')
    .get(async (req, res, next) => {
        try {
            const result = await db('Participant')
                .select();

            if (!result) {
                res.status(404).json({
                    "type": "error",
                    "error": 404,
                    "message": "ressource non disponible : /participant"
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

// Get participant with email
router.route('/get/email')
    .get(async (req, res, next) => {
        try {
            const result = await db('Participant')
                .where('email', req.body.email)
                .select();

            if (!result) {
                res.status(404).json({
                    "type": "error",
                    "error": 404,
                    "message": "ressource non disponible : /participant/get/email"
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

//create participant
router.route('/create')
    .post(async (req, res, next) => {
        try {
            await db('Participant').insert({
                name: req.body.name,
                firstname: req.body.firstname,
                tel_number: req.body.tel_number,
                comment: req.body.comment,
                state: req.body.state,
                id_event: req.body.id_event,
            }).returning('id_participant');

            res.status(201).json('participant ajouté');
        } catch (error) {
            res.status(500).json({
                "type": "error",
                "error": 500,
                "message": error
            })
        }
    });

//create participant for email
router.route('/create/email')
    .post(async (req, res, next) => {
        try {
            await db('Participant').insert({
                email: req.body.email,
                id_event: req.body.id_event,
            });

            res.status(201).json('participant ajouté');
        } catch (error) {
            res.status(500).json({
                "type": "error",
                "error": 500,
                "message": error
            })
        }
    });

//get all event for a participant
router.route('/:id_participant')
    .get(async (req, res, next) => {
        try {
            const result = await db('Participant')
                .where('id_participant', req.params.id_participant)
                .select();

            if (!result) {
                res.status(404).json({
                    "type": "error",
                    "error": 404,
                    "message": "ressource non disponible : /Participant/" + req.params.id_participant
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

//get all participant by id event
router.route('/getParticipants/:id_event')
    .get(async (req, res, next) => {
        try {
            const participants = await db('Participant')
                .where('id_event', req.params.id_event)
                .select();

            const participantsResult = participants.map(participant => {
                return {
                    "participants": {
                        "id_participant": participant.id_commentaire,
                        "name": participant.name,
                        "firstname": participant.firstname,
                        "tel_number": participant.tel_number,
                        "comment": participant.comment,
                        "id_event": participant.id_event,
                        "state": participant.state,
                    }
                }
            });

            result = {
                "participants": participantsResult
            };

            if (!result) {
                res.status(404).json({
                    "type": "error",
                    "error": 404,
                    "message": "ressource non disponible : /participants/getParticipants" + req.params.id_event
                });
            } else {
                res.status(200).json(result);
            }
        } catch (error) {
            res.json({
                "type": "error",
                "error": 500,
                "message": error
            });
        }
    });

//update event by id
router.route('/update/:id_participant')
    .put(async (req, res, next) => {
        try {
            const participant = await db('Participant')
                .where('id_participant', req.params.id_participant)
                .select()
                .first();

            if (!participant) {
                res.status(404).json({
                    "type": "error",
                    "error": 404,
                    "message": "ressource non disponible : /participant/update/" + req.params.id_participant
                });
            } else {
                const result = await db('Participant')
                    .where('id_participant', req.params.id_participant)
                    .update({
                        name: req.body.name || participant.name,
                        firstname: req.body.firstname || participant.firstname,
                        tel_number: req.body.tel_number || participant.tel_number,
                        comment: req.body.comment || participant.comment,
                        state: req.body.state || participant.state,
                        id_event: req.body.id_event || participant.id_event,
                    });

                if (!result) {
                    res.status(404).json({
                        "type": "error",
                        "error": 404,
                        "message": "ressource non disponible : /participant/update/" + req.params.id_participant
                    });
                } else {
                    res.status(200).json('participant modifié.');
                }
            }

        } catch (error) {
            res.json({
                "type": "error",
                "error": 500,
                "message": error
            });
        }
    });

//delete participant by id
router.route('/delete/:id_participant')
    .delete(async (req, res, next) => {
        try {
            const result = await db('Participant')
                .where('id_participant', req.params.id_participant)
                .del();

            if (!result) {
                res.status(404).json({
                    "type": "error",
                    "error": 404,
                    "message": "ressource non disponible : /Participants/delete/" + req.params.id_participant
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
