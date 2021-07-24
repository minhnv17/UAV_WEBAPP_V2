const express = require('express')
router = express.Router()
const mqtt_api = require('../controllers/mqtt.controller')

router.post('/publish', mqtt_api.publish)

module.exports = router