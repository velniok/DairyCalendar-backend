const EventModel = require("../models/Event")

class EventController {
    async create (req, res) {
        try {
            const title = req.body.title
            const color = req.body.color
            const start = req.body.start
            const end = req.body.end
            const userId = req.body.userId

            const doc = new EventModel({
                title: title,
                color: color,
                start: start,
                end: end,
                userId: userId,
            })

            const newEvent = await doc.save()

            res.json(newEvent)
        } catch (err) {
            console.log(err)
            res.status(500).json({
                message: 'Не удалось создать задачу'
            })
        }
    }

    async get (req, res) {
        try {
            const userId = req.params.userId
            const events = await EventModel.find({ userId: userId }).sort({ start: 1 })

            res.json(events)
        } catch (err) {
            console.log(err)
            res.status(500).json({
                message: 'Не удалось получить задачи'
            })  
        }
    }

    async edit (req, res) {
        try {
            const eventId = req.params.id

            const event = await EventModel.findById(eventId)

            event.title = req.body.title
            event.color = req.body.color
            event.start = req.body.start
            event.end = req.body.end

            event.save()

            res.json(event)
        } catch (err) {
            console.log(err)
            res.status(500).json({
                message: 'Не удалось изменить задачу'
            }) 
        }
    }

    async delete (req, res) {
        try {
            const eventId = req.params.id

            await EventModel.findByIdAndDelete(eventId)

            res.json({
                success: true
            })
        } catch (err) {
            console.log(err)
            res.status(500).json({
                message: 'Не удалось удалить задачу'
            }) 
        }
    }
}

module.exports = new EventController()