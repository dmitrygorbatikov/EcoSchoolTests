const {Schema, model} = require('mongoose')

const schema = new Schema({
    quiz_title: {
        type: String,
        required: true
    },
    color:{
        type: String,
        required: true
    },
    class: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true
    },
    background: {
        type: String,
        required: true
    },
    questions: {
        type: Array,
        required: true
    }
})

module.exports = model('Quiz', schema)
