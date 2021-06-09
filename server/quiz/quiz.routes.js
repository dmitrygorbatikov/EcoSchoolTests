const {Router} = require('express')
const router = Router()
const quizController = require('../controllers/quizController')
const auth = require('../middleware/auth.middleware')

router.post('/create-quiz', quizController.createQuiz)
router.post('/create-question', quizController.createQuestion)
router.post('/create-answer', quizController.createAnswer)
router.get('/get-quizzes', auth, quizController.getQuizzes)
router.get('/get-quiz/:id', auth, quizController.getQuizById)
router.post('/end-test', auth, quizController.endTest)
router.get('/get-test-result/:id', auth, quizController.getTestResult)
router.get('/get-user-statistics', auth, quizController.getUserStatistics)

module.exports = router