const { Router } = require('express')
const bodyParser = require('body-parser')
const router = Router()
router.use(bodyParser.urlencoded({ extended: true }))
router.use(bodyParser.json())

const { auth } = require('../controllers')

router.post('/login', auth.login)

module.exports = router
