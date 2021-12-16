const {Schema, model} = require('mongoose');

const RequestsSchema = new Schema({

    title: String,
    type: String,
    description: String,
    date: String,
    status: Boolean,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }

});

module.exports = model('Requests', RequestsSchema);