const express = require('express');
const bcrypt = require('bcrypt');
const knex = require('knex');
const router = express.Router();
const jwt = require('jsonwebtoken');
const randtoken = require('rand-token');
const secret = process.env.accessToken;


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

// all user
router.route('/')
    .get(async (req, res, next) => {
        const users = await db('User').select();
        res.status(200).json(users);
    });

// create user rdv
router.route('/create')
    .post(async (req, res, next) => {
        await db('User').insert({
            firstname: req.body.firstname,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 10),
            tel_number: req.body.tel_number
        });

        res.status(201).json('user ajouté');
    });

//TODO FAIRE UN SIGNIN QUI DONNE UN ACCESTOKEN ET UN REFRESH TOKEN LE REFRESH SERA STOCKER EN BDD
router.route('/signin')
    .post(async (req, res) => {
        if (!req.headers.authorization || req.headers.authorization.indexOf('Basic ') === -1) {
            return res.status(401).json({ type: 'error', error: 401, message: 'no authorization header present' });
        } else {
            // Récupération des credentials dans le header Authorization
            const credentials = req.headers.authorization.split(' ')[1];
            const decodedCredentials = Buffer.from(credentials, 'base64').toString('ascii');
            const [email, password] = decodedCredentials.split(':');

            // Vérification des credentials avec la base de données
            const user = await db('User').where({ email: email.trim() }).first();

            const userPassword = bcrypt.compareSync(password, user.password);
            if (!userPassword) {
                return res.status(401).json({ type: 'error', error: 401, message: 'invalid credentials' });
            } else {

                const payload = {
                    id: user.id_user,
                    user: user.firstname,
                    email: email,
                }
                const options = {
                    expiresIn: '1h'
                };

                const accessToken = jwt.sign(payload, secret, options);
                const refreshToken = randtoken.generate(50);
                await db('User').where({ id_user: user.id_user }).update({ refresh_token: refreshToken });

                // Renvoyer l'access-token
                res.status(201).json({
                    "id_user": user.id_user,
                    "email": email,
                    "user": user.firstname,
                    "tel": user.tel_number,
                    "accesstoken": accessToken,
                    "refreshtoken": refreshToken,
                });
            }
        }
    })

//TODO FAIRE UN VALIDATE AVEC UN BEARER TOKEN POUR VERIFIER SI LE TOKEN ET VALIDE SI NON REFESH LE TOKEN
router.route('/validate').get((req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Authorization header missing or invalid' });
    }

    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, secret);
        console.log(decoded)
        return res.status(200).json(decoded);
    } catch (error) {
        console.log(error)
        return res.status(401).json({ message: 'Invalid or expired token' });
    }
});
//TODO FAIRE UN REFRESH QUI RECREER UN ACCES TOKEN ET UN REFRESH TOKEN LE REFREH TOKEN SERA REMPLACER PAR UN NOUVEAU
// refresh token with refresh_token
router.route('/refresh').post(async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            res.status(401).json({ type: "error", error: 401, message: "no authorization header present" });
        } else {
            const [type, token] = authHeader.split(' ');
            const result = await db('User').select('id_user', 'firstname', 'email', 'refresh_token').where('refresh_token', token).first();
            if (result) {
                const payload = {
                    id: result.id_user,
                    name: result.firstname,
                    mail: result.email
                };
                console.log(payload)
                // access token
                const accessToken = jwt.sign(payload, secret, { expiresIn: '1h' });

                // refresh token
                const refreshToken = randtoken.generate(50);
                await db('User').update({ refresh_token: refreshToken }).where('id_user', result.id_user);
                console.log(refreshToken);

                res.status(200).json({ "accesstoken": accessToken, "refreshtoken": refreshToken });
            } else {
                res.status(401).json({ type: "error", error: 401, message: "wrong refresh token" });
            }
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ type: "error", error: 500, message: "erreur" });
    }
}
);


module.exports = router;
