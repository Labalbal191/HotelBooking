const mongoose = require("mongoose");

var mongoURL = 'mongodb+srv://Labalbal191:gunsnroses1@cluster0.5hs81.mongodb.net/NoBoCoTel'

mongoose.connect(mongoURL, {useUnifiedTopology: true, useNewUrlParser: true})

var connection = mongoose.connection

connection.on('error', () =>{
    console.log('Connection with database has failed')
})

connection.on('connected', () =>{
    console.log('Connected with database')
})

module.exports = mongoose