const {Router} = require('express')
const router = Router()
const authController = require('../controllers/authController')
const auth = require('../middleware/auth.middleware')

router.post('/register', authController.register)
router.post('/login', authController.login)
router.get('/get-user', auth, authController.getUser)

module.exports = router