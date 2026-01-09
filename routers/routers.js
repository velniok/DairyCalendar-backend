const AuthController = require('../controllers/AuthController')
const EventController = require('../controllers/EventController')
const UserController = require('../controllers/UserController')

const checkAuth = require('../middlewares/checkAuth')
const checkUser = require('../middlewares/checkUser')

const Router = require('express').Router

const router = new Router()

router.post('/auth/register', AuthController.register)
router.post('/auth/login', AuthController.login)
router.get('/auth/me', checkAuth, AuthController.authMe)

router.get('/user/get/:id', UserController.getUser)
router.post('/user/search', UserController.searchUser)
router.patch('/user/edit/:userId', checkUser, UserController.editUser)

router.post('/event/create', checkUser, EventController.create)
router.get('/event/get/:userId', EventController.get)
router.patch('/event/edit/:id', EventController.edit)
router.delete('/event/delete/:id', EventController.delete)

module.exports = router