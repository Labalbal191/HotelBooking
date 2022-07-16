import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Room from '../components/Room'
import Loader from '../components/Loader'
import Error from '../components/Error'
import { DatePicker, Space } from 'antd'
import 'antd/dist/antd.css'
import moment from 'moment'
const { RangePicker } = DatePicker

function Homescreen() {

    const [rooms, setrooms] = useState([])
    const [loading, setloading] = useState()
    const [error, seterror] = useState()
    const [fromdate, setfromdate] = useState()
    const [todate, settodate] = useState()
    const [duplicaterooms, setduplicaterooms] = useState([])

    useEffect(() => {
        try {

            setloading(true)
            async function gettingRooms() {
                const data = (await axios.get('/api/rooms/getallrooms')).data
                setrooms(data)
                setduplicaterooms(data)
                setloading(false)
            }
            gettingRooms()
        }
        catch (error) {
            seterror(true)
            setloading(false)
        }
    }, [])

    function filterByDate(dates) {
        setfromdate(moment(dates[0]).format('DD-MM-YYYY'))
        settodate(moment(dates[1]).format('DD-MM-YYYY'))

        var temprooms = []

        for (const room of duplicaterooms) {
            var available = false
            if (room.currentbookings.length > 0) {
                for (var booking of room.currentbookings) {
                    if (
                        !moment(moment(dates[0]).format('DD-MM-YYYY')).isBetween(booking.fromdate, booking.todate)
                        &&
                        !moment(moment(dates[1]).format('DD-MM-YYYY')).isBetween(booking.fromdate, booking.todate)
                    ) {
                        if (
                            moment(dates[0]).format('DD-MM-YYYY') !== booking.fromdate &&
                            moment(dates[0]).format('DD-MM-YYYY') !== booking.todate &&
                            moment(dates[1]).format('DD-MM-YYYY') !== booking.fromdate &&
                            moment(dates[1]).format('DD-MM-YYYY') !== booking.todate
                        ) {
                            available = true
                        }
                    }
                }
            }
            if (available == true || room.currentbookings.length == 0) {
                temprooms.push(room)
            }
            setrooms(temprooms)
        }
    }

    function filterByPeople(e){
        const temp = duplicaterooms.filter(room=>room)
    }

    return (

        <div className='container'>
            <div className='row mt-5 col-md-11 bs'>
                <div className='col-md-5'>
                    <RangePicker format='DD-MM-YYYY' onChange={filterByDate} />
                </div>
                
                <div className='col-md-3'>
                    <select className='form-control'>
                        <option value="Wszystkie"> Wszystkie pokoje</option>
                        <option value="50"> 0-50 zł</option>
                        <option value="100"> 100-150 zł</option>
                        <option value="150"> 150-200 zł</option>
                        <option value="200"> 200+ zł</option>
                    </select>
                </div>
                <div className='col-md-3'>
                    <select className='form-control'>
                        <option value="Wszystkie"> Wszystkie pokoje</option>
                        <option value="1"> 1 osobowe</option>
                        <option value="2"> 2 osobowe</option>
                        <option value="3"> 3 osobowe</option>
                        <option value="4"> 4+ osobowe</option>
                    </select>
                </div>


            </div>
            <div className='row justify-content-center mt-3'>
                {loading ?
                    (<Loader />)
                    : rooms.length > 1 ?
                        (rooms.map(room => {
                            return <div className='com-md-9 mt-2'>
                                <Room room={room} fromdate={fromdate} todate={todate} />
                            </div>
                        }))
                        : <Error />
                }
            </div>
        </div>
    );
}

export default Homescreen