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
            console.error(error);
            res.json(error.response.data)
        }
}); 

// create event
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
            console.error(error);
            res.json(error.response.data);
        }
});

module.exports = router;
