var express = require('express');
var router = express.Router();
const mealsCtrl = require('../controllers/meals');
const isLoggedIn = require('../config/auth');


router.post('/mealplans/:id/meals', isLoggedIn, mealsCtrl.create);

module.exports = router;