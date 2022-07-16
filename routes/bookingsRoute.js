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
            idempotencyKey: uuidv4()
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
        }
        res.send("Pokój zarezerwowany pomyślnie!")
    } catch (error) {
        return res.status(400).json({ message: error });
    }
})

module.exports = router