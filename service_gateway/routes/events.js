const express = require('express');
const router = express.Router();
const axios = require('axios')

// **** Gateway of service_Events/events.js ****

// get all events
router.route('/')
    .get(async (req, res, next) => {
        try {
            const response = await axios.get('http://service_Events:3000/events');
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
            const response = await axios.post('http://service_Events:3000/events/create', {
                id_user: req.body.id_user,
                address: req.body.address,
                date_event: req.body.date_event,
            });
            res.json(response.data);
        } catch (error) {
            console.error(error);
            res.json(error.response.data);
        }
});

//get event by id
router.route('/:id_event')
    .get(async (req, res, next) => {
        try {
            const response = await axios.get('http://service_Events:3000/events/' + req.params.id_event);
            res.json(response.data);
        } catch (error) {
            console.error(error);
            res.json(error.response.data)
        }
}); 

// delete event by id
router.route('/delete/:id_event')
    .delete(async (req, res, next) => {
        try {
            const response = await axios.delete('http://service_Events:3000/events/delete/' + req.params.id_event);
            res.json(response.data);
        } catch (error) {
            console.error(error);
            res.json(error.response.data)
        }
});

module.exports = router;
