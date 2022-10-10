const mongoose = require('mongoose')
const Schema = mongoose.Schema

const mealPlanSchema = new Schema({
    name: String,
    meals: [], 
    user: {type: Schema.Types.ObjectId, ref: 'User', required: true }

}, {
    timestamps: true
})

module.exports = mongoose.model('MealPlan', mealPlanSchema)