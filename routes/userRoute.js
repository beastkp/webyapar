const express = require('express')
const { handleView } = require('../controllers/userCtrl')
const router = express.Router()

router.route('/confirmation').post(handleView);

module.exports = router