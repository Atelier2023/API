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

// Get all comments
router.route('/')
    .get(async (req, res, next) => {
        try {
            let result;
            if (req.query.user) {
                const comments = await db('Commentaire')
                    .where('id_user', req.query.user)
                    .groupBy('id_commentaire')
                    .select();

                const commentResult = comments.map(comment => {
                    return {
                        "comment": {
                            "id_commentaire": comment.id_commentaire,
                            "id_event": comment.id_event,
                            "commentaire": comment.commentaire,
                            "date": comment.date,
                        }
                    }
                });

                result = {
                    "type": "collection",
                    "count": commentResult.length,
                    "comments": commentResult
                };
            } else {
                result = await db('Commentaire').select();
            }

            if (!result) {
                res.status(404).json({
                    "type": "error",
                    "error": 404,
                    "message": "ressource non disponible : /commentaire"
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

//create comment
router.route('/create')
    .post(async (req, res, next) => {
        try {
            await db('Commentaire').insert({
                commentaire: req.body.commentaire,
                id_user: req.body.id_user,
                id_event: req.body.id_event,
                date: req.body.date,
            });

            res.status(201).json('commentaire ajouté');
        } catch (error) {
            res.status(500).json({
                "type": "error",
                "error": 500,
                "message": "Erreur interne du serveur"
            })
        }
    });

//get all commentaires by id event
router.route('/:id_event')
    .get(async (req, res, next) => {
        try {
            const comments = await db('Commentaire')
                .where('id_event', req.params.id_event)
                .select();

            const commentResult = comments.map(comment => {
                return {
                    "comment": {
                        "id_commentaire": comment.id_commentaire,
                        "id_user": comment.id_user,
                        "commentaire": comment.commentaire,
                        "date": comment.date,
                    }
                }
            });

            result = {
                "type": "collection",
                "count": commentResult.length,
                "comments": commentResult
            };

            if (!result) {
                res.status(404).json({
                    "type": "error",
                    "error": 404,
                    "message": "ressource non disponible : /commentaire/" + req.params.id_event 
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

//update commentaires by id
//todo: if comment inexistant return 404
router.route('/update/:id_commentaire')
    .put(async (req, res, next) => {
        try {
            const result = await db('Commentaire')
                .where('id_commentaire', req.params.id_commentaire)
                .update({
                    commentaire: req.body.commentaire
                });
                
            if (!result) {
                res.status(404).json({
                    "type": "error",
                    "error": 404,
                    "message": "ressource non disponible : /commentaire/update/" + req.params.id_commentaire
                });
            } else {
                res.status(200).json('commentaire modifié.');
            }
        } catch (error) {
            res.json({
                "type": "error",
                "error": 500,
                "message": error
            });
        }
    });

//delete commentaire by id
router.route('/delete/:id_commentaire')
    .delete(async (req, res, next) => {
        try {
            const result = await db('Commentaire')
                .where('id_commentaire', req.params.id_commentaire)
                .del();

            if (!result) {
                res.status(404).json({
                    "type": "error",
                    "error": 404,
                    "message": "ressource non disponible : /Commentaires/delete/" + req.params.id_commentaire
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
