const MealPlan = require('../models/mealplan')
const Meal = require('../models/meal')

module.exports = {
    index,
    show,
    create
  };


function index(req, res) {
    MealPlan.find({}, function(err, mealplans) {

      res.render('mealplans', { title: 'Meal Plans', mealplans });
    });
    
  }



function show(req, res){
  console.log('in mealplans show')
  MealPlan.findById(req.params.id, function(err, mealplan) {
    if(err){
      console.log('err:', err)
    } else {
      console.log('no error, mealplan:', mealplan)
    }
    res.render('mealplans/show', { title: `${mealplan.title}`, mealplan });
  });
}

function create(req, res) {
  console.log('create function called')
  
  req.body.user = req.user._id;
  const mealplan = new MealPlan(req.body);
  mealplan.save(function(err) {
    // one way to handle errors
    if (err) return res.redirect('/mealplans');
    // for now, redirect right back to new.ejs
    res.redirect(`/mealplans`);
  });
}