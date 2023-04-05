const express = require('express');
const router = express.Router();
const axios = require('axios')

// **** Gateway of service_Events/participants.js ****

// get all participants
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

// get a participant with email
router.route('/get/email')
    .post(async (req, res, next) => {
        try {
            const response = await axios.post('http://service_Events:3000/participants/get/email', {
                email: req.body.email,
            });
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
                comment: req.body.comment,
                state: req.body.state,
                id_event: req.body.id_event,
                email: req.body.email
            });
            res.json(response.data);
        } catch (error) {
            console.error(error);
            res.json(error.response.data);
        }
});

// create participant for email
router.route('/create/email')
    .post(async (req, res, next) => {
        try {
            const response = await axios.post('http://service_Events:3000/participants/create/email', {
                email: req.body.email,
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
            res.json(error)
        }
}); 

//get all participants of an event
router.route('/getParticipants/:id_event')
    .get(async (req, res, next) => {
        try {
            const response = await axios.get('http://service_Events:3000/participants/getParticipants/' + req.params.id_event);
            res.json(response.data);
        } catch (error) {
            res.json(error)
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
                comment: req.body.comment,
                state: req.body.state,
                id_event: req.body.id_event
            });
            res.json(response.data);
        } catch (error) {
            res.json(error)
        }
});

// delete a participant
router.route('/delete/:id_participant')
    .delete(async (req, res, next) => {
        try {
            const response = await axios.delete('http://service_Events:3000/participants/delete/' + req.params.id_participant);
            res.json(response.data);    
        } catch (error) {
            res.json(error)
        }   
});

router.route('/idparticipant')
    .post(async (req, res, next) => {
        try {
            const response = await axios.post('http://service_Events:3000/participants/idparticipant', {
                email: req.body.email,
                id_event: req.body.id_event,
            });
            res.json(response.data);
        } catch (error) {
            console.error(error);
            res.json(error.response.data);
        }
});


module.exports = router;
