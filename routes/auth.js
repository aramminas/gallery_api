require('dotenv').config();
const {Router} = require('express');
const router = Router();
const GalUser = require('../models/galUser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const tokenLife = process.env.TOKEN_LIFE;
const secret = process.env.TOKEN_SECRET;
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;
const refreshTokenLife = process.env.REFRESH_TOKEN_LIFE;

router.post('/sign/in', async (req, res) => {
    try {

        const {email, password} = req.body;
        const user = await GalUser.findOne({ email: email });

        if (!user) {
            return res.json({status: 0, statusCode: 401, message: 'The email you’ve entered doesn\'t match any account.' });
        }

        const checkPassword = await bcrypt.compare(password, user.password);

        if (user && checkPassword) {

            const accessToken = jwt.sign({ id: user._id }, secret, { expiresIn: parseInt(tokenLife) });
            const refreshToken = jwt.sign({ id: user._id }, refreshTokenSecret, { expiresIn: parseInt(refreshTokenLife) });

            res.status(200).json({status: 1, user, refreshToken, accessToken});

        } else {
            res.json({status: 0, statusCode: 401, message: 'Invalid Email or Password' });
        }

    } catch (e) {
        console.log(e)
        res.status(400).json({status: 0, statusCode: 400, message: 'Oops, Something Went Wrong.' });
    }
});

router.post('/sign/up', async (req, res) => {
    try {
        const {firstName, lastName, email, password} = req.body;
        const isUser = await GalUser.findOne({email});
        const hashPass = await bcrypt.hash(password, 10);

        if(!isUser){
            const user = new GalUser({
                firstName,
                lastName,
                email,
                password: hashPass,
            });
            await user.save();

            const accessToken = jwt.sign({ id: user._id }, secret, { expiresIn: parseInt(tokenLife) });
            const refreshToken = jwt.sign({ id: user._id }, refreshTokenSecret, { expiresIn: parseInt(refreshTokenLife) });

            res.status(200).json({status: 1, user, refreshToken, accessToken});

        }else {
            res.json({status: 0, statusCode: 401, message: `This email is already registered!`});
        }
    }catch (e){
        console.log('Error: ', e);
        res.status(400).json({status: 0, message: `Error: ${e}`});
    }
});

router.post('/token', async (req, res) => {
    try {

        if (!req.headers.refresh) {
            return res.status(401).json({status: 0, message: 'No token provided.1' });
        }

        const token = req.headers.refresh.split(" ");
        if (!token || !token[0]) {
            return res.status(401).json({status: 0, message: 'No token provided.2' });
        }

        jwt.verify(token[0], refreshTokenSecret, async (err, data) => {

            if (err) {
                return res.json({status: 0, message: 'Token is expired.' });
            }

            const accessToken = jwt.sign({ id: data.id }, secret, { expiresIn: parseInt(tokenLife) });
            const refreshToken = jwt.sign({ id: data.id }, refreshTokenSecret, { expiresIn: parseInt(refreshTokenLife) });
            const user = await GalUser.findById(data.id);

            res.status(201).json({
                status: 1,
                accessToken,
                refreshToken,
                user,
            });
        });
    }  catch (e) {
        res.status(400).json({status: 0, message: 'Oops, Something Went Wrong.'});
    }
});

module.exports = router;