const {Schema, model} = require('mongoose')

const schema = new Schema({
    quizId: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    grade: {
        type: Number,
        required: true
    },
    questions_length: {
        type: Number,
        required: true
    },
    quiz_title: {
        type: String,
        required: true
    },
    endDateTime:{
        type: String,
        required: true
    }
})

module.exports = model('TestHistory', schema)