const {Schema, model} = require('mongoose')

const schema = new Schema({
    first_name: {
        type: String,
        required: true
    },
    second_name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role:{
        type: String,
        required: true,
        default: "user"
    }
})

module.exports = model('User', schema)