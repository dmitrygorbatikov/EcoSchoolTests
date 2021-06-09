const {Schema, model} = require('mongoose')

const schema = new Schema({
    answer_text: {
        type: String,
        required: true
    },
    right: {
        type: Boolean,
        required: true
    }
})

module.exports = model('Answer', schema)