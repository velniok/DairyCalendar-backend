const jwt = require('jsonwebtoken')
require('dotenv').config()

const checkUser = (req, res, next) => {
    try {
        const token = (req.headers.authorization || '').replace(/Bearer\s?/, '')
        if (!token) {
            return res.status(401).json({ message: 'Не авторизован' })
        }

        let userId = null

        if (req.body.userId) {
            userId = req.body.userId
        } else if (req.params.userId) {
            userId = req.params.userId
        }

        const decoded = jwt.verify(token, process.env.TOKEN_SECRET_KEY)
        
        if (decoded._id !== userId) {
            return res.status(403).json({ message: 'Нет доступа' })
        }

        next()
    } catch (err) {
        res.status(401).json({ message: 'Не авторизован' })
    }
}

module.exports = checkUser