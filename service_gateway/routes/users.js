const express = require('express');
const router = express.Router();
const axios = require('axios')

// **** Gateway of service_Users/users.js ****

// get all users
router.route('/')
    .get(async (req, res, next) => {
        try {
            const response = await axios.get('http://service_Users:3000/users');
            res.json(response.data);
        } catch (error) {
            res.json(error)
        }
}); 

//check mail
router.route('/checkMail/')
    .post(async (req, res, next) => {
        try {
            const response = await axios.get('http://service_Users:3000/users/checkMail/');
            res.json(response.data);
        } catch (error) {
            res.json(error)
        }
});

// create user
router.route('/create')
    .post(async (req, res, next) => {
        try {
            const response = await axios.post('http://service_Users:3000/users/create', {
                firstname: req.body.firstname,
                email: req.body.email,
                password: req.body.password,
                tel_number: req.body.tel_number
            });

            res.json(response.data);
        } catch (error) {
            res.json(error)
        }
});

// to do : -signin with refresh token and access token etc ...
// - delete user 

// signin
router.route('/signin')
    .post(async (req, res, next) => {
        try {
            const response = await axios.post('http://service_Users:3000/users/signin', {
                email: req.body.email,
                password: req.body.password
            });

            res.json(response.data);
        } catch (error) {
            res.json(error)
        }
}); 

// validate
router.route('/validate')
    .get(async (req, res, next) => {
        try {
            const response = await axios.get('http://service_Users:3000/users/validate');
            res.json(response.data);
        } catch (error) {
            res.json(error)
        }
}); 

// refresh
router.route('/refresh')
    .post(async (req, res, next) => {
        try {
            const response = await axios.post('http://service_Users:3000/users/refresh', {
                authorization: req.headers.authorization
            });

            res.json(response.data);
        } catch (error) {
            res.json(error)
        }
}); 

// get refresh token by id
router.route('/getRefresh/:id')
    .get(async (req, res, next) => {
        try {
            const response = await axios.post('http://service_Users:3000/users/getRefresh/:id');
            res.json(response.data);
        } catch (error) {
            res.json(error)
        }
}); 

// get user by id
router.route('/getUser/:id_user')
    .get(async (req, res, next) => {
        try {
            const response = await axios.get('http://service_Users:3000/users/getUser/' + req.params.id_user);
            res.json(response.data);
        } catch (error) {
            res.json(error)
        }
});


module.exports = router;
