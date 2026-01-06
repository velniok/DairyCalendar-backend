const UserModel = require("../models/User")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

class EventController {
    async register (req, res) {
        try {
            const username = req.body.username
            const email = req.body.email
            const password = req.body.password
            
            const user = await UserModel.find({ email: email })

            if (user.length > 0) {
                return res.json({
                    message: 'Пользователь уже существует'
                })
            }

            const salt = await bcrypt.genSalt(10)
            const hashPassword = await bcrypt.hash(password, salt)

            const doc = new UserModel({
                username: username,
                email: email,
                password: hashPassword,
            })

            const newUser = await doc.save()

            const token = jwt.sign(
                {
                    _id: newUser._id
                },
                process.env.TOKEN_SECRET_KEY,
                {
                    expiresIn: "30d"
                }
            )

            res.json({newUser, token})
        } catch (err) {
            console.log(err)
            res.status(500).json({
                message: 'Не удалось создать аккаунт'
            })
        }
    }

    async login (req, res) {
        try {
            const email = req.body.email
            const password = req.body.password

            const user = await UserModel.findOne({ email: email })

            if (!user) {
                return res.status(404).json({
                    message: 'Неверный логин или пароль',
                })
            }

            const isValidPass = await bcrypt.compare(password, user.password)
            if (!isValidPass) {
                return res.status(404).json({
                    message: 'Неверный логин или пароль',
                })
            }

            const token = jwt.sign(
                {
                    _id: user._id
                },
                process.env.TOKEN_SECRET_KEY,
                {
                    expiresIn: "30d"
                }
            )

            res.json({user, token})
        } catch (err) {
            console.log(err)
            res.status(500).json({
                message: 'Не удалось войти в аккаунт'
            })
        }
    }

    async authMe (req, res) {
        try {
            const userId = req.userId

            const user = await UserModel.findById(userId)

            if (!user) {
                return res.status(404).json({
                    message: 'Пользователь не найден'
                })
            }
            
            res.json({user})
        } catch (err) {
            console.log(err)
            res.status(500).json({
                message: 'Не удалось авторизоваться'
            })
        }
    }
}

module.exports = new EventController()