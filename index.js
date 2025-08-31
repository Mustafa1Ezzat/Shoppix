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


mongoose.connect(process.env.MONGO_DB).then(()=> console.log('Connected to MongoDB successfully!'))
.catch(err => console.log('Failed to connect to MongoDB:', err))

    server.use('/Registers', RegisterRouter)

    server.get('/', (req, res) => {
    res.send('API is running')
    })

    
    server.listen(PORT, ()=>{
        console.log(`Server is running on http://localhost:${PORT}`)
    })