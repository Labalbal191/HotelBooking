const express = require('express');
const router = express.Router();

const Room = require('../models/room')


router.get("/getallrooms", async(req, res) =>{

    try{
        const rooms = await Room.find({})
        res.send(rooms)
    }
    catch(error){
        return res.status(400).json({message: error});
    }
});

router.post("/getroombyid", async(req, res) => {
    const roomid = req.body.roomid
    try {
         const room = await Room.findOne({'_id' : req.body.roomid})
         res.send(room)
    } catch (error) {
        console.log(error)
         return res.status(400).json({ message: error });
    }
});

router.post("/addroom", async(req, res) => {
    const roomid = req.body.roomid
    try {
         const newroom = new Room(req.body)
         await newroom.save()
         res.send('Nowy pokój dodany pomyślnie')
    } catch (error) {
        console.log(error)
         return res.status(400).json({ message: error });
    }
});


router.post("/deleteroom", async(req, res) => {
    const roomid = req.body.roomid
   
    try {
         const room = await Room.deleteOne({'_id' : roomid})
         res.send('Pokój usunięty')
    } catch (error) {
        console.log("tutaj sie wywala")
         return res.status(400).json({ message: error });
    }
});


module.exports = router