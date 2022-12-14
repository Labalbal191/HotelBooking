const mongoose = require("mongoose");

const roomSchema = mongoose.Schema({
    name:{
        type: String,
        require: true
    },
    people:{
        type: Number,
        require: true
    },
    rentperday:{
        type: Number,
        require: true
    },
    imageurls:[],
    currentbookings: [],
    description:{
        type:String,
        require: true
    }
} , {
    timestamps: true,
})

const roomModel = mongoose.model('rooms', roomSchema)

module.exports = roomModel