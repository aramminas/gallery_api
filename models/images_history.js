const {Schema, model} = require('mongoose');

const image_history = new Schema({
    id: {
        type: String,
        require: true
    },
    type: {
        type: String,
        require: true
    },
    x: {
        type: String,
    },
    y: {
        type: String,
    },
    width: {
        type: String,
    },
    height: {
        type: String,
    },
    percentage: {
        type: String,
    },
    imageId: {
        type: Schema.Types.ObjectId,
        ref: 'Image'
    }
});

module.exports = model('ImagesHistory', image_history);