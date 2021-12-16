const {Schema, model} = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new Schema({
    name: String,
    email: String,
    password: String
});

userSchema.pre('save', async function(next) {
    const hash = await bcrypt.hash(this.password, 8);
    this.password = hash;

    next();
});

module.exports = model('User', userSchema);