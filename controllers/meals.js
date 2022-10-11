const MealPlan = require('../models/mealplan')
const Meal = require('../models/meal');

module.exports = {
    create
  };

function create(req, res) {
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