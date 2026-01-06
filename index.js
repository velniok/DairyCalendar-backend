const express = require('express')
const cors = require('cors')
require('dotenv').config();
const mongoose = require('mongoose')
const router = require('./routers/routers')

mongoose
    .connect(process.env.DATABASE_URL)
    .then(() => console.log('DB OK'))
    .catch((err) => console.log('DB error:', err))

const app = express()

app.use(express.json())
app.use(cors())

app.use('/api', router)

app.listen(process.env.PORT || 5000, (err) => {
    if (err) {
        return console.log('Server error:', err)
    }

    console.log('Server OK')
})