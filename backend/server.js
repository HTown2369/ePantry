require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const grantRoutes = require('./routes/grants')
const userRoutes = require('./routes/users')
const donateRoutes = require('./routes/donate')
const authRoutes = require('./routes/auth')
const grantApplicationRoutes = require('./routes/grantApplications')
const donorHistReqRoutes = require('./routes/donorHistReq')

const app = express()

app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})


app.use('/api/grants', grantRoutes)
app.use('/api/users', userRoutes)
app.use('/api/donate', donateRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/grantapplications', grantApplicationRoutes)
app.use('/api/donor-history', donorHistReqRoutes)

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log('connected to db and listening on port', process.env.PORT)
        })
    })
    .catch((error) => {
        console.log(error)
    })
