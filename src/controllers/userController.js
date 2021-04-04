const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const User = require('../models/User');
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

            return res.json({ users });
        } catch (err) {
            res.status(400).send({ error: 'Error loading users' })
        }
    },
    async show(req, res) {
        try {
            const users = await User.findById(req.params.userId);

            return res.json({ users });
        } catch (err) {
            res.status(400).send({ error: 'Error find user' })
        }
    },
    async create(req, res) {
        const { userName, email } = req.body;
        try {
            if (await User.findOne({ email })) {
                return res.status(400).send({ error: 'User already exists' })
            }

            const user = await User.create(req.body);

            user.password = undefined;

            return res.send({
                user,
                token: generateToken({ id: user.id })
            })
        } catch (err) {
            res.status(400).send({ error: 'Error creating new user' })
        }
    },
    async update(req, res) {
        try {
            let user = await User.findById(req.params.userId);

            if (!user) {
                return res.status(400).send({ error: 'User does not exists' })
            }

            user = await User.findByIdAndUpdate(
                req.params.userId,
                req.body,
                {
                    new: true
                })

            user.password = undefined;

            return res.send({
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

            return res.send()
        } catch (err) {
            res.status(400).send({ error: 'Error deleting user' })
        }
    },
}