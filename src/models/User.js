const mongoose = require('../database');
const bcryptjs = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        require: true,
    },
    middleName: {
        type: String,
    },
    lastName: {
        type: String,
        require: true,
    },
    adress: {
        type: String
    },
    city: {
        type: String
    },
    state: {
        type: String
    },
    postalCode: {
        type: String
    },
    country: {
        type: String
    },
    phoneNumber: {
        type: String
    },
    age: {
        type: Number
    },
    birthDate: {
        type: Date
    },
    userName: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,  
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        require: true,
        select: false
    },
    isActive: {
        type: Boolean,
        default: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    company: {
        title: {
            type: String
        },
        description: {
            type: String
        },
        phoneNumber: {
            type: String
        },
        email: {
            type: String
        },
        location: {
            adress: {
                type: String
            },
            city: {
                type: String
            },
            state: {
                type: String
            },
            country: {
                type: String
            }
        }
    }
});

UserSchema.pre('save', async function (next) {
    const hash = await bcryptjs.hash(this.password, 10);
    this.password = hash;

    next();
})

const User = mongoose.model('User', UserSchema);
module.exports = User;