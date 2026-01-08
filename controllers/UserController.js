const UserModel = require("../models/User")

class UserController {
    async getUser (req, res) {
        try {
            const userId = req.params.id

            const user = await UserModel.findById(userId)

            if (!user) {
                return res.status(404).json({
                    message: 'Пользователь не найден'
                })
            }

            res.json(user)
        } catch (err) {
            console.log(err)
            res.status(500).json({
                message: 'Не удалось получить пользователя'
            })
        }
    }

    async searchUser (req, res) {
        try {
            const value = req.body.value

            const users = await UserModel.find({
                username: {
                    $regex: value,
                    $options: 'i'
                }
            })

            res.json(users)
        } catch (err) {
            console.log(err)
            res.status(500).json({
                message: 'Не удалось найти пользователей'
            })
        }
    }
}

module.exports = new UserController()