import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Room from '../components/Room'
import Loader from '../components/Loader'
import Error from '../components/Error'
import Information from '../components/Information'
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
    const [people, setpeople] = useState('all')
    const [price, setprice] = useState('all')

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
            var available = true
            if (room.currentbookings.length > 0) {
                for (var booking of room.currentbookings) {
                    var pickedFromDate= moment(moment(dates[0]).format('DD-MM-YYYY'))._i
                    var pickedFromDateDays = parseInt(pickedFromDate.toString().substring(0,2))
                    var pickedFromDateMonths = parseInt(pickedFromDate.toString().substring(4,6))

                    var pickedToDate= moment(moment(dates[1]).format('DD-MM-YYYY'))._i
                    var pickedToDateDays = parseInt(pickedToDate.toString().substring(0,2))
                    var pickedToDateMonths = parseInt(pickedToDate.toString().substring(4,6))

                    var bookingFromDateDays = parseInt(booking.fromdate.toString().substring(0,2))
                    var bookingFromDateMonths = parseInt(booking.fromdate.toString().substring(4,6))

                    var bookingToDateDays = parseInt(booking.todate.toString().substring(0,2))
                    var bookingToDateMonths = parseInt(booking.todate.toString().substring(4,6))

                    if(pickedFromDateMonths >= bookingFromDateMonths && pickedFromDateMonths <=bookingToDateMonths||
                        pickedToDateMonths >= bookingFromDateMonths && pickedToDateMonths <=bookingToDateMonths){
                        if(pickedFromDateDays >= bookingFromDateDays && pickedFromDateDays <=bookingToDateDays ||
                            pickedToDateDays >= bookingFromDateDays && pickedToDateDays <=bookingToDateDays){
                                available=false
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

    function filterByPeople(a){
        setpeople(a)
        if(a=='all'){
            setrooms(duplicaterooms)
        }
        else{
            const tempPeople = duplicaterooms.filter(room=>room.people == a)
            setrooms(tempPeople)
        }
    }

   
    function filterByPrice(e){
        setprice(e)
        if(e=='all'){
            setrooms(duplicaterooms)
        }
        else if(e=='50'){
            const tempPrice = duplicaterooms.filter(room=>room.rentperday <= 50)
            setrooms(tempPrice)
        }
        else if(e=='100'){
            const tempPrice = duplicaterooms.filter(room=>room.rentperday >50 && room.rentperday <= 100)
            setrooms(tempPrice)
        }
        else if(e=='200'){
            const tempPrice = duplicaterooms.filter(room=>room.rentperday >100 && room.rentperday <= 200)
            setrooms(tempPrice)
        }
        else if(e=='300'){
            const tempPrice = duplicaterooms.filter(room=>room.rentperday >200)
            setrooms(tempPrice)
        }
    }

    return (

        <div className='container'>
            <div className='row mt-5 col-md-11 bs'>
                <div className='col-md-5'>
                    <RangePicker format='DD-MM-YYYY' onChange={filterByDate} />
                </div>
                
                <div className='col-md-3'>
                    <select className='form-control' value={price} onChange={(e)=>{filterByPrice(e.target.value)}}>
                        <option value="all"> Wszystkie pokoje</option>
                        <option value="50"> 0-50 zł</option>
                        <option value="100"> 50-100 zł</option>
                        <option value="200"> 100-200 zł</option>
                        <option value="300"> 200+ zł</option>
                    </select>
                </div>
                <div className='col-md-3'>
                    <select className='form-control' value={people} onChange={(a)=>{filterByPeople(a.target.value)}}>
                        <option value="all"> Wszystkie pokoje</option>
                        <option value="1"> 1 osobowe</option>
                        <option value="2"> 2 osobowe</option>
                        <option value="3"> 3 osobowe</option>
                        <option value="4"> 4 osobowe</option>
                    </select>
                </div>


            </div>
            <div className='row justify-content-center mt-3'>
                {loading ?
                    (<Loader />)
                    : rooms.length >= 1 ?
                        (rooms.map(room => {
                            return <div className='com-md-9 mt-2'>
                                <Room room={room} fromdate={fromdate} todate={todate} />
                            </div>
                        }))
                        : <div className='col-md-4 mt-4'>
                            <Information message = 'Niestety nie mamy pokoju spełniającego podane parametry'/>
                        </div>
                }
            </div>
        </div>
    );
}

export default Homescreen