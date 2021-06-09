const express = require('express')
const mongoose = require('mongoose')
const config = require('config')
const bodyParser = require('body-parser')

const app = express()

app.use (bodyParser.json ({limit: '10mb', extended: true}))
app.use (bodyParser.urlencoded ({limit: '10mb', extended: true}))

app.use(express.json())


app.use('/api/auth', require('./auth/auth.routes'))
app.use('/api/quiz', require('./quiz/quiz.routes'))


const PORT = config.get('port')



async function start(){
    try{
        mongoose.connect(config.get('mongoUri'), {
                useCreateIndex: true,
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useFindAndModify: true
            },
            () => console.log('MongoDB connected')
        )
        app.listen(PORT, () => {
            console.log('Server started')
        })
    }
    catch (e) {
        console.log(e.message)
        process.exit(1)
    }
}
start()