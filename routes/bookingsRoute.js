const express = require('express')
const router = express.Router()
const Booking = require("../models/booking")
const moment = require('moment')
const Room = require('../models/room')
const stripe = require('stripe')('sk_test_51LMBCvIacNpxP4wTMUp2JTMlRHqxA3lkXrq4PPUps0y1a5tTgUml3xVUvNOd0g0910icSvNDD8UHbPoYAR4xQvYy00e7JHBahN')
const { v4: uuidv4 } = require('uuid');

router.post("/bookroom", async (req, res) => {
    const {
        room,
        user,
        fromdate,
        todate,
        totalamount,
        totaldays,
        barek,
        spa,
        token
    } = req.body
    try {
        const customer = await stripe.customers.create({
            email: token.email,
            source: token.id
        })
        const payment = await stripe.charges.create({
            amount: totalamount * 100,
            customer: customer.id,
            currency: 'PLN',
            receipt_email: token.email

        }, {
            idempotencyKey: uuidv4(),
        }
        )
        if (payment) {

                const newbooking = new Booking({
                    room: room.name,
                    roomid: room._id,
                    userid: user._id,
                    fromdate: moment(fromdate).format("DD-MM-YYYY"),
                    todate: moment(todate).format("DD-MM-YYYY"),
                    totalamount,
                    totaldays,
                    barek,
                    spa,
                    transactionId: '1234',
                    status: 'Zarezerwowany'
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
        }
        res.send("Pokój zarezerwowany pomyślnie!")
    } catch (error) {
        return res.status(400).json({ message: error });
    }
})
router.post('/getbookingsbyuserid', async (req, res) => {
    const userid =  req.body.userid
    try {
        const bookings = await Booking.find({userid: userid})
        res.send(bookings)
    } catch (error) {
        return res.status(400).json({ message: error });
    }
})

router.post('/cancelbooking', async (req, res) => {
    
    const {bookingid, roomid} = req.body
    try {
      const bookingToBeRemoved = await Booking.findOne({_id: bookingid})
      bookingToBeRemoved.status = "Anulowana" 
      await bookingToBeRemoved.save()

      const room = await Room.findOne({_id: roomid})
      const bookings = room.currentbookings

      const temp = bookings.filter(booking => booking.bookingid.toString() !== bookingid)
      room.currentbookings = temp

      await room.save()
      res.send("Anulowano pomyślnie")
    } catch (error) {
        return res.status(400).json({ message: error });
    }
})

module.exports = router