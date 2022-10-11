const MealPlan = require('../models/mealplan')
const Meal = require('../models/meal');

module.exports = {
    create
  };

function create(req, res) {
    let startTime = req.body.startHour + ':' + req.body.startMin + req.body.startAMPM
    let endTime = req.body.endHour + ':' + req.body.endMin + req.body.endAMPM

    console.log('line 12', req.body)
    MealPlan.findById(req.params.id, function(err, mealplan) {
        if(err){
          console.log('err:', err)
        } else {
          console.log('no error, mealplan:', mealplan)
        }
        req.body = {
            event: req.body.event,
            startTime: startTime,
            endTime: endTime,
            description: req.body.description,
            mealPlan: mealplan._id
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