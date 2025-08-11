require('dotenv').config()

let express = require('express')
let mongoose = require('mongoose')
let cors = require('cors')
let server = express()
let port = 8000


// Routers
let RegisterRouter = require('./routes/Register')


// middleware
server.use(cors())
server.use(express.json())


mongoose.connect(process.env.MONGO_DB).then(()=> console.log('Connected to MongoDB successfully!'))
.catch(err => console.log('Failed to connect to MongoDB:', err))

    server.use('/Registers', RegisterRouter)

server.listen(port, ()=>{
        console.log(`Server is running on http://localhost:${port}`)
})