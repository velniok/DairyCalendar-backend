const mongoose = require('mongoose')

const EventSchema = new mongoose.Schema({
    title: { type: String, required: true },
    color: { type: String, required: true },
    start: { type: Date },
    end: { type: Date },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, {
    timestamps: true
})

module.exports = mongoose.model('Event', EventSchema)