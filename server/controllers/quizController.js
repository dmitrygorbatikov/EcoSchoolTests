const Quiz = require('../models/Quiz')
const Question = require('../models/Question')
const Answer = require('../models/Answer')
const TestHistory = require('../models/TestHistory')

class quizController{
    async createQuiz(req,res){
        try{
            const quiz = new Quiz({
                quiz_title: req.body.quiz_title,
                color: req.body.color,
                class: req.body.class,
                img: req.body.img,
                background: req.body.background,
                questions: []
            })
            await quiz.save()
            return res.status(200).json(quiz)
        }
        catch (e) {
            return res.status(400).json({message: e.message})
        }
    }

    async getQuizzes(req,res){
        try{
            const quizzes = await Quiz.find({}, {quiz_title: 1, color: 1, class: 1, img: 1})

            return res.status(200).json(quizzes)

        }
        catch (e) {
            return res.status(400).json({message: e.message})
        }
    }
    async getQuizById(req,res){
        try{
            await Quiz.findById(req.params.id).then((result) => {
                return res.status(200).json({questions: result.questions, quiz_title: result.quiz_title, background: result.background})
            })
        }
        catch (e) {
            return res.status(400).json({message: e.message})
        }
    }
    async createQuestion(req,res){
        try{
            await Quiz.findById(req.header('quiz_id')).then(async (quiz) => {
                let questions = quiz.questions

                const question = new Question({
                    question_title: req.body.question_title,
                    description: req.body.description,
                    img: req.body.img,
                    answers: []
                })

                questions.push(question)

                let body = {
                    'questions': questions
                }
                await Quiz.findByIdAndUpdate(req.header('quiz_id'), body)
                return res.status(200).json({message: "question created", question})
            })
        }
        catch (e) {
            return res.status(400).json({message: e.message})
        }
    }
    async createAnswer(req,res){
        try{
            const answer = new Answer({
                answer_text: req.body.answer_text,
                right: req.body.right
            })


            await Quiz.findById({_id: req.header('id')}).then(async (result) => {
                let questions = result.questions
                for (let i in questions) {
                    if (questions[i]._id == req.header('question_id')) {
                        questions[i].answers.push(answer)
                        break
                    }
                }
                let body = {
                    'questions': questions
                }
                await Quiz.findByIdAndUpdate({_id: req.header('id')}, body).then(() => {
                    return res.status(200).send({message: 'Ok'})
                })
            })
        }
        catch (e) {
            return res.status(400).send({ 'error': e });
        }
    }
    async endTest(req,res){
        try{
            const {answers} = req.body
            let count = 0
            for (let i = 0; i < answers.length; i++) {
                if(answers[i].right == true){
                    count++
                }
            }
            const testHistory = new TestHistory({
                quizId: req.body.quizId,
                userId: req.user.userId,
                grade: count,
                questions_length: req.body.questions_length,
                quiz_title: req.body.quiz_title,
                endDateTime: new Date().toLocaleString('ru',
                    {
                        day: 'numeric',
                        month: 'numeric',
                        year: 'numeric',
                        hour: "numeric",
                        minute: "numeric"
                    })
            })
            await testHistory.save()

            return res.status(200).json(testHistory)

        }
        catch (e) {
            return res.status(400).send({ 'error': e });
        }
    }
    async getTestResult(req,res){
        try{
            await TestHistory.findById(req.params.id).then((result) => {
                return res.status(200).json(result)
            })
        }
        catch (e) {
            return res.status(400).send({ 'error': e });
        }
    }
    async getUserStatistics(req,res){
        try{
            await TestHistory.find({userId: req.user.userId}).then((result) => {
                return res.status(200).json(result)
            })
        }
        catch (e) {
            return res.status(400).send({ 'error': e });
        }
    }


}

module.exports = new quizController()
