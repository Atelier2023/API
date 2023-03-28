const express = require('express');
const router = express.Router();
const axios = require('axios')

// **** Gateway of service_Users ****

// get all users
router.route('/')
    .get(async (req, res, next) => {
        try {
            const response = await axios.get('http://service_Users:3000/users');
            res.json(response.data);
        } catch (error) {
            console.error(error);
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
            console.error(error);
            res.json(error)
        }
});

// delete user

// to do


module.exports = router;
