const mongoose = require('mongoose')
const Schema = mongoose.Schema

const mealSchema = new Schema({
    subject: String,
    startDate: String,
    startTime: String,
    endDate: String,
    endTime: String,
    description: String,
    user: {type: Schema.Types.ObjectId, ref: 'mealPlan', required: true }

}, {
    timestamps: true
})

module.exports = mongoose.model('Meal', mealSchema)