let Schema = require('mongoose').Schema
let mongoose = require('mongoose')


    let Data = new Schema({
        fullname : String,
        email : String,
        age : String,
        mobile : Number,
        password : String,
        data: Array
    })



    let userdata = mongoose.model('Shoppix', Data)


    module.exports = userdata