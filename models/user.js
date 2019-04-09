const mongoose = require('mongoose');
const validator = require('validator');
const createError = require('http-errors');
var integerValidator = require('mongoose-integer');
let mongooseHidden = require('mongoose-hidden')()
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const util = require('util');

const jwtSignPromise = util.promisify(jwt.sign);

const jwtKey = 'secretKey';
var Schema = mongoose.Schema;


const saltRounds = 7;

// const bcrypt
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        match: /^[a-zA-Z ]+[a-zA-Z]$/
    },
    password: {
        type: String,
        required: true,
        // match: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/
        hide: true //to hide password
    },
    age: {
        type: Number,
        min: 18,
        max: 100,
        required: true,
        integer: true
    },
    email: {
        required: 'Email address is required',
        type: String,
        // match: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
        validate: validator.isEmail,
        unique: true,
        required: true,
    },
    gender: {
        type: String,
        lowercase: true,
        enum: ['female', 'male'],
        required: true
    },
    countries: {
        type: String,
        enum: ['Egypt', 'USA', 'UK', 'Canada']
    },
});
// }, {
//         toJSON: {
//             transform: function (doc, ret, options) {
//                 delete ret['password'];
//                 return ret;
//             }
//         }
//     });


userSchema.pre('save', async function (arg) {
    const hash = await bcrypt.hash(this.password, saltRounds);
    this.password = hash;
}
)

userSchema.method('verifyPassword', async function (password) {
    return bcrypt.compare(password, this.password);
})

userSchema.method('generateToken', function () {
    return jwtSignPromise({ id: this._id, username: this.username }, jwtKey, { expiresIn: '2d' })
})


userSchema.plugin(integerValidator);
userSchema.plugin(mongooseHidden, { hidden: { _id: false } }); //to send user id
module.exports = mongoose.model('users', userSchema);
// const newUser = new User({ name: 'rania', age: 18, email: 'rania@gmail.com', gender: 'Female' });
// newUser.save().then(() => console.log('meow')).catch(e => console.log(e));