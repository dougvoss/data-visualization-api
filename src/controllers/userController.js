const User = require('../models/User');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const authConfig = require('../config/auth');


function generateToken(params = {}) {
    return token = jwt.sign(params, authConfig.secret, {
        expiresIn: authConfig.expiresIn
    });

}

module.exports = {
    async list(req, res) {
        try {
            const users = await User.find();

            return res.json({ result: 'Success', users });
        } catch (err) {
            res.status(400).send({ error: 'Error loading users' })
        }
    },
    async show(req, res) {
        try {
            const users = await User.findById(req.params.userId);

            return res.json({ result: 'Success', users });
        } catch (err) {
            res.status(400).send({ error: 'Error find user' })
        }
    },
    async create(req, res) {
        const { email } = req.body;
        try {
            if (await User.findOne({ email })) {
                return res.status(400).send({ error: 'User already exists' })
            }

            const user = await User.create(req.body);

            user.password = undefined;

            return res.send({
                result: 'Success',
                user,
                token: generateToken({ id: user.id })
            })
        } catch (err) {
            res.status(400).send({ error: 'Error creating new user' })
        }
    },
    async update(req, res) {
        try {
            const { name, email, password } = req.body;

            let user = await User.findById(req.params.userId);

            if (!user) {
                return res.status(400).send({ error: 'User does not exists' })
            }

            user = await User.findByIdAndUpdate(
                req.params.userId,
                {
                    name,
                    email,
                    password
                },
                {
                    new: true
                })

            user.password = undefined;

            return res.send({
                result: 'Success',
                user,
                token: generateToken({ id: user.id })
            })
        } catch (err) {
            res.status(400).send({ error: 'Error updating user' })
        }
    },
    async delete(req, res) {
        const { userId } = req.params;
        try {
            if (!await User.findById(userId)) {
                return res.status(400).send({ error: 'User does not exists' })
            }

            await User.findByIdAndRemove(userId);

            return res.send({ result: 'Success', })
        } catch (err) {
            res.status(400).send({ error: 'Error deleting user' })
        }
    },
}