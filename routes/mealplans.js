var express = require('express');
var router = express.Router();
const mealplansCtrl = require('../controllers/mealplans');
const isLoggedIn = require('../config/auth');
// All routes "start with" /movies (from server.js)

router.get('/', isLoggedIn, mealplansCtrl.index);
// Use isLoggedIn middleware to protect routes
router.get('/:id', isLoggedIn, mealplansCtrl.show);
// router.get('/:id', moviesCtrl.show);
router.post('/', isLoggedIn, mealplansCtrl.create);

module.exports = router;