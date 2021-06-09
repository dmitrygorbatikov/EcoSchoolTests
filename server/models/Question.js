const {Schema, model} = require('mongoose')

const schema = new Schema({
    question_title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    img: {
      type: String,
      required: false
    },
    answers: {
        type: Array,
        required: true
    }
})

module.exports = model('Question', schema)