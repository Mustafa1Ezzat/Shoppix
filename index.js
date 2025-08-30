require('dotenv').config()

let express = require('express')
let mongoose = require('mongoose')
let cors = require('cors')
let server = express()
let PORT = process.env.PORT || 3000;


// Routers
let RegisterRouter = require('./src/routes/Register')


// middleware
server.use(cors())
server.use(express.json())


mongoose.connect("mongodb+srv://mustafa1ezzat:6h0O72XE6pJRY3FY@shoppix.xcwfxsm.mongodb.net/?retryWrites=true&w=majority&appName=Shoppix").then(()=> console.log('Connected to MongoDB successfully!'))
.catch(err => console.log('Failed to connect to MongoDB:', err))

    server.use('/Registers', RegisterRouter)


    module.exports = server

// server.listen(PORT, ()=>{
//         console.log(`Server is running on http://localhost:${PORT}`)
// })