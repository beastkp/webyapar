const express  = require('express');
const {getUsers,updateStatus} = require('../controllers/adminCtrl')
const router = express.Router();

router.route('/adminPage')
router.route('/fetchUsers').get(getUsers)
router.route('/updateStatus').post(updateStatus)

module.exports = router