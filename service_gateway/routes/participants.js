const express = require('express');
const router = express.Router();
const axios = require('axios')

// **** Gateway of service_Events/participants.js ****

// get all comments
router.route('/')
    .get(async (req, res, next) => {
        try {
            const response = await axios.get('http://service_Events:3000/participants');
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
            const response = await axios.post('http://service_Events:3000/participants/create', {
                name: req.body.name,
                firstname: req.body.firstname,
                tel_number: req.body.tel_number,
                id_event: req.body.id_event,
            });
            res.json(response.data);
        } catch (error) {
            console.error(error);
            res.json(error.response.data);
        }
});

module.exports = router;
