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

// Get all participant
router.route('/')
    .get(async (req, res, next) => {
        try {
            let result;
            if (req.query.event) {
                // Get all participant by id_event
                const participants = await db('Participant')
                    .where('id_event', req.query.event)
                    .select();

                const participantResult = participants.map(participant => {
                    return {
                        "participant": {
                            "id_participant": participant.id_participant,
                            "name": participant.name,
                            "firstname": participant.firstname,
                            "tel_number": participant.tel_number,
                            "address": participant.address,
                        }
                    }
                });

                result = {
                    "type": "collection",
                    "count": participantResult.length,
                    "events": participantResult
                };
            } else {
                result = await db('Participant').select();
            }

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

//create participant
router.route('/create')
    .post(async (req, res, next) => {
        try {
            await db('Participant').insert({
                name: req.body.name,
                firstname: req.body.firstname,
                tel_number: req.body.tel_number,
                id_event: req.body.id_event,
            });

            res.status(201).json('participant ajouté');
        } catch (error) {
            res.status(500).json({
                "type": "error",
                "error": 500,
                "message": "Erreur interne du serveur"
            })
        }
    });

//get all event for participant
router.route('/:id_participant')
    .get(async (req, res, next) => {
        try {
            const result = await db('Participant')
                .where('id_event', req.params.id_event)
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

module.exports = router;
