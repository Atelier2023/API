const express = require('express');
const router = express.Router();
const axios = require('axios')

// **** Gateway of service_Events/commentaire.js ****

// get all comments
router.route('/')
    .get(async (req, res, next) => {
        try {
            const response = await axios.get('http://service_Events:3000/commentaires');
            res.json(response.data);
        } catch (error) {
            res.json(error)
        }
}); 

// create a comment
router.route('/create')
    .post(async (req, res, next) => {
        try {
            const response = await axios.post('http://service_Events:3000/commentaires/create', {
                commentaire: req.body.commentaire,
                id_user: req.body.id_user,
                id_event: req.body.id_event,
                date: req.body.date,
            });
            res.json(response.data);
        } catch (error) {
            res.json(error);
        }
});

// get all comments of an event
router.route('/:id_event')
    .get(async (req, res, next) => {
        try {
            const response = await axios.get('http://service_Events:3000/commentaires/' + req.params.id_event);
            res.json(response.data);
        } catch (error) {
            res.json(error)
        }
});

// update a comment
router.route('/update/:id_commentaire')
    .put(async (req, res, next) => {
        try {
            const response = await axios.put('http://service_Events:3000/commentaires/update/' + req.params.id_commentaire, {
                commentaire: req.body.commentaire,
            });
            res.json(response.data);
        } catch (error) {
            res.json(error)
        }
});

// delete a comment
router.route('/delete/:id_commentaire')
    .delete(async (req, res, next) => {
        try {
            const response = await axios.delete('http://service_Events:3000/commentaires/delete/' + req.params.id_commentaire);
            res.json(response.data);
        } catch (error) {
            res.json(error)
        }
});

module.exports = router;
