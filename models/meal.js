const mongoose = require('mongoose')
const Schema = mongoose.Schema

const mealSchema = new Schema({
    event: String,
    startTime: String,
    endTime: String,
    description: String,
    days: [String],
    mealPlan: {type: Schema.Types.ObjectId, ref: 'mealPlan', required: true }

}, {
    timestamps: true
})

module.exports = mongoose.model('Meal', mealSchema)