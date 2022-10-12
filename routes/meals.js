var express = require('express');
var router = express.Router();
const mealsCtrl = require('../controllers/meals');
const isLoggedIn = require('../config/auth');


router.post('/mealplans/:id/meals/edit', isLoggedIn, mealsCtrl.edit);
router.post('/mealplans/:id/meals', isLoggedIn, mealsCtrl.create);
router.get('/meals/:id', isLoggedIn, mealsCtrl.show)
router.delete('/meals/:id', isLoggedIn, mealsCtrl.delete)
module.exports = router;