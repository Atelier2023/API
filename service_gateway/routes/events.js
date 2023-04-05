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
            res.json(error);
        }
}); 

//getEvent by id_user
router.route('/getEvent/:id_user')
    .get(async (req, res, next) => {
        try {
            const response = await axios.get('http://service_Events:3000/events/getEvent/' + req.params.id_user);
            res.json(response.data);
        } catch (error) {
            res.json(error);
        }
});

// create event
router.route('/create')
    .post(async (req, res, next) => {
        try {
            const response = await axios.post('http://service_Events:3000/events/create', {
                id_user: req.body.id_user,
                title: req.body.title,
                address: req.body.address,
                date_event: req.body.date_event,
            });
            res.json(response.data);
        } catch (error) {
            res.json(error);
        }
});

//get event by id
router.route('/:id_event')
    .get(async (req, res, next) => {
        try {
            const response = await axios.get('http://service_Events:3000/events/' + req.params.id_event);
            res.json(response.data);
        } catch (error) {
            res.json(error)
        }
}); 

// update event by id
router.route('/update/:id_event')
    .put(async (req, res, next) => {
        try {
            const response = await axios.put('http://service_Events:3000/events/update/' + req.params.id_event, {
                date_event: req.body.date_event,
                address: req.body.address,
                is_before: req.body.is_before,
                is_after: req.body.is_after,
                state: req.body.state,
            });
            res.json(response.data);
        } catch (error) {
            res.json(error)
        }
});

// delete event by id
router.route('/delete/:id_event')
    .delete(async (req, res, next) => {
        try {
            const response = await axios.delete('http://service_Events:3000/events/delete/' + req.params.id_event);
            res.json(response.data);
        } catch (error) {
            res.json(error)
        }
});

//get event by shared url
router.route('/shared/:shared_url')
    .get(async (req, res, next) => {
        try {
            const response = await axios.get('http://service_Events:3000/events/shared/' + req.params.shared_url);
            res.json(response.data);
        } catch (error) {
            res.json(error)
        }
});

//get shared url by email user
router.route('/shared/email')
    .post(async (req, res, next) => {
        try {
            const response = await axios.post('http://service_Events:3000/events/shared/email', {
                email: req.body.email,
            });
            res.json(response.data);
        } catch (error) {
            res.json(error)
        }
});

module.exports = router;
