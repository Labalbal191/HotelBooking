import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Loader from '../components/Loader'
import Error from '../components/Error'
import moment from 'moment'


function Bookingscreen({ match }) {

  const [loading, setloading] = useState(true)
  const [error, seterror] = useState()
  const [room, setroom] = useState()

  const roomid = match.params.roomid
  const fromdate = moment(match.params.fromdate , 'DD-MM-YYYY')
  const todate = moment(match.params.todate , 'DD-MM-YYYY')
  const totaldays = moment.duration(todate.diff(fromdate)).asDays() + 1
  const [totalamount, settotalamount] = useState()

  useEffect(() => {
    try {
      setloading(true)
      async function gettingRoom() {
        const data = (await axios.post('/api/rooms/getroombyid', { roomid: match.params.roomid })).data
        setroom(data)
        setloading(false)
        settotalamount(data.rentperday * totaldays)
      }
      gettingRoom()
    }
    catch (error) {
      seterror(true)
      console.log(error)
      setloading(false)
    }
  }, [])

  async function bookRoom(){
    
    const bookingDetails = {
      room,
      user: (JSON.parse(localStorage.getItem('currentUser'))).data,
      fromdate,
      todate,
      totalamount,
      totaldays
    }
  
    try{
      const result = await axios.post('/api/bookings/bookroom', bookingDetails)
    }catch(error){
      console.log(error)
    }
  }

  return (
    <div className='m-5'>
      {loading ?
        (<Loader />)
        : room ?
          (
            <div>
            <div className='row justify-content-center mt-6 bx_shadow'>
              <div className='col-md-5'>
                <h1>{room.name}</h1>
                <img src={room.imageurls[0]} classname='fullsizeimg' />
              </div>

              <div className='col-md-5'>
                <h1>Szczegóły rezerwacji</h1>
                <hr></hr>
                <b>
                  <p>Od: {match.params.fromdate}</p>
                  <p>Do: {match.params.todate}</p>
                  <p>Dni: {totaldays}</p>
                  <p>Cena za dzień: {room.rentperday} </p>
                  <p>Suma: {totalamount}</p>
                </b>
                <div>
                  <button style={{ float: 'right' }} className='room_btn' onClick={bookRoom}> Zarezerwuj</button>
                </div>
              </div>
            </div>
          </div>)
          : (<Error />)
      }
    </div>
  )
}

export default Bookingscreen