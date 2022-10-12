const MealPlan = require('../models/mealplan')
const Meal = require('../models/meal');

module.exports = {
    create,
    show,
    edit,
    delete: deleteMeal
  };
function show(req, res){
    Meal.findById(req.params.id, function(err, meals){
        MealPlan.findById(meals.mealPlan, function(err, mealplan){
            res.render('meals/show', { 
                title: `${meals.event}`,
                 mealplan,
                 meals,
            });
        })
    })
}

function deleteMeal(req, res, next){
    let mealID 
    Meal.findById(req.params.id, function(err, meal){
        mealID = meal.mealPlan;
    })
    Meal.deleteOne({_id: req.params.id}, function(err) {
        // one way to handle errors
        if (err){
            return res.redirect('/mealplans');
        } else {
            res.redirect(`/mealplans/${mealID}`);
        }
        
      })
}
function edit(req, res) {
    let daysEnum = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    let days = []
    if(req.body.startAMPM === "PM"){
        req.body.startHour = parseInt(req.body.startHour, 10) + 12;
    } 
    if(req.body.endAMPM === "PM"){
        req.body.endHour = parseInt(req.body.endHour, 10) + 12;
    }
    let startTime = req.body.startHour + req.body.startMin
    let endTime = req.body.endHour + req.body.endMin
    daysEnum.forEach(function(day){
        if(Object.keys(req.body).includes(day)){
            days.push(day)
        }
    })
    Meal.findById(req.params.id, function(err, meal){
        meal.event = req.body.event,
        meal.startTime = startTime,
        meal.endTime = endTime,
        meal.description = req.body.description,
        meal.days = days

        meal.save(function(err) {
            // one way to handle errors
            if (err){
                return res.redirect('/mealplans');
            } else {
                res.redirect(`/meals/${req.params.id}`);
            }
            
          })
      });
  }

  function create(req, res) {
    let daysEnum = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    let days = []
    console.log('req.body.startHour',req.body.startHour)
    console.log('req.body.endHour', req.body.endHour)
    if(req.body.startAMPM === "PM"){
        
    } else if(parseInt(req.body.startHour)===12){
        req.body.startHour = '00'
    }
    if(req.body.endAMPM === "PM"){
        if(parseInt(req.body.endHour) !== 12){
            req.body.endHour = parseInt(req.body.endHour, 10) + 12;
        }
    } else if(parseInt(req.body.endHour)===12){
        req.body.endHour = '00'
    }
    console.log('req.body.startHour', req.body.startHour)
    console.log('req.body.endHour', req.body.endHour)
    let startTime = req.body.startHour + req.body.startMin
    let endTime = req.body.endHour + req.body.endMin
    console.log('startTime', startTime)
    console.log('endTime', endTime)
    
    MealPlan.findById(req.params.id, function(err, mealplan) {
        if(err){
          console.log('err:', err)
        } 
        
        daysEnum.forEach(function(day){
            if(Object.keys(req.body).includes(day)){
                days.push(day)
            }
        })
        req.body = {
            event: req.body.event,
            startTime: startTime,
            endTime: endTime,
            description: req.body.description,
            mealPlan: mealplan._id,
            days: days
        }
        const meal = new Meal(req.body)
        
        meal.save(function(err) {
            // one way to handle errors
            if (err){
                return res.redirect('/mealplans');
            } else {
                res.redirect(`/mealplans/${req.params.id}`);
            }
            
          })
      });

  }