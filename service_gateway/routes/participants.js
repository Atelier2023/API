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

// get all event of a participant
router.route('/:id_participant')
    .get(async (req, res, next) => {
        try {
            const response = await axios.get('http://service_Events:3000/participants/' + req.params.id_participant);
            res.json(response.data);
        } catch (error) {
            console.error(error);
            res.json(error.response.data)
        }
}); 

// update a participant
router.route('/update/:id_participant')
    .put(async (req, res, next) => {
        try {
            const response = await axios.put('http://service_Events:3000/participants/update/' + req.params.id_participant, {
                name: req.body.name,
                firstname: req.body.firstname,
                tel_number: req.body.tel_number,
                address: req.body.address,
                state: req.body.state,
                id_event: req.body.id_event
            });
            res.json(response.data);
        } catch (error) {
            console.error(error);
            res.json(error.response.data)
        }
});

// delete a participant
router.route('/delete/:id_participant')
    .delete(async (req, res, next) => {
        try {
            const response = await axios.delete('http://service_Events:3000/participants/delete/' + req.params.id_participant);
            res.json(response.data);    
        } catch (error) {
            console.error(error);
            res.json(error.response.data)
        }   
});

module.exports = router;
