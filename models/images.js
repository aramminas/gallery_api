const {Schema, model} = require('mongoose');

const image = new Schema({
    id: {
        type: String,
        require: true
    },
    url: {
        type: String,
        require: true
    },
});

module.exports = model('Images', image);