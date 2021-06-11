const User = require('../models/User')
const bcrypt = require('bcryptjs')
const config = require('config')
// const auth = require('../../middleware/auth.middleware')
const jwt = require('jsonwebtoken')

class AuthController{
    async register(req,res){
        try {
            const candidate = await User.findOne({ phone: req.body.phone })

            if (candidate) {
                return res.json({message: 'Такой пользователь уже существует'})
            }
            const hashedPassword = await bcrypt.hash(req.body.password, 12)

            const user = new User({
                first_name: req.body.first_name,
                second_name: req.body.second_name,
                phone: req.body.phone,
                password: hashedPassword
            })
            await user.save()
            return res.status(200).json({message: 'Пользователь создан!'})

        }
        catch (e) {
            return res.status(400).json({message: e.message})
        }
    }

    async login(req,res){
        try {
            const {phone, password} = req.body

            const user = await User.findOne({phone})

            if(!user){
                return res.status(400).json({message:'Пользователь не найден'})
            }

            const isMatch = await bcrypt.compare(password, user.password)

            if(!isMatch){
                return res.status(400).json({message:'Неверный пароль, попробуйте снова'})
            }

            const token = jwt.sign(
                { userId: user.id },
                config.get('jwtSecret')
            )
            return res.status(200).send({token, userId: user.id})
        }
        catch (e) {
            return res.status(400).json({message:'Что-то пошло не так, попробуйте снова'})
        }
    }
    async getUser(req,res){
        try{
            await User.findById(req.user.userId).then((user) => {
                return res.status(200).json({name: user.first_name, surname: user.second_name})
            })
        }
        catch (e) {
            return res.status(400).json({message:'Что-то пошло не так, попробуйте снова'})
        }
    }
}

module.exports = new AuthController()