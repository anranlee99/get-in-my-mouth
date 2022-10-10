const MealPlan = require('../models/mealplan')
const Meal = require('../models/meal')

module.exports = {
    index,
    // show,
    new: newMealplan,
    create
  };


function index(req, res) {
    MealPlan.find({}, function(err, mealplans) {
      res.render('mealplans', { title: 'Meal Plans', mealplans });
    });
    
  }

function newMealplan(req, res){
  res.render('mealplans/new',{title: 'New Meal Plan'})
}

function create(req, res) {
  const meal = new Meal(req.body);
  meal.save(function(err) {
    // one way to handle errors
    if (err) return res.redirect('/mealplans/new');
    // for now, redirect right back to new.ejs
    res.redirect(`/mealplans`);
  });
}