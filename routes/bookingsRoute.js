const express = require('express')
const router = express.Router()
const Booking = require("../models/booking")
const moment = require('moment')
const Room = require('../models/room')

router.post("/bookroom", async (req, res) => {
    const {
        room,
        user,
        fromdate,
        todate,
        totalamount,
        totaldays } = req.body

    try {
        const newbooking = new Booking({
            room: room.name,
            roomid: room._id,
            userid: user._id,
            fromdate: moment(fromdate).format("DD-MM-YYYY"),
            todate: moment(todate).format("DD-MM-YYYY"),
            totalamount,
            totaldays,
            transactionId: '1234'
        })
        const booking = await newbooking.save()

        const roomtemp = await Room.findOne({ _id: room._id })
        roomtemp.currentbookings.push(
            {
                bookingid: booking._id,
                fromdate: moment(fromdate).format("DD-MM-YYYY"),
                todate: moment(todate).format("DD-MM-YYYY"),
                userid: user._id,
                status: booking.status
            })
        await roomtemp.save()

        res.send('Room booked successfully')
    } catch (error) {
        return res.status(400).json({ message: error });
    }
})

module.exports = router