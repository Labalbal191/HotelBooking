import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Loader from '../components/Loader'
import Error from '../components/Error'
import moment from 'moment'
import Swal from 'sweetalert2'
import StripeCheckout from 'react-stripe-checkout'

function Bookingscreen({ match }) {

  const [loading, setloading] = useState(true)
  const [error, seterror] = useState()
  const [room, setroom] = useState()

  const roomid = match.params.roomid
  const fromdate = moment(match.params.fromdate, 'DD-MM-YYYY')
  const todate = moment(match.params.todate, 'DD-MM-YYYY')
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

  async function onToken(token) {
    const bookingDetails = {
      room,
      user: (JSON.parse(localStorage.getItem('currentUser'))).data,
      fromdate,
      todate,
      totalamount,
      totaldays,
      token
    }

    try {
      setloading(true)
      const result = await axios.post('/api/bookings/bookroom', bookingDetails)
      setloading(false)
      Swal.fire('Sukces', 'Pokój zarezerwowany pomyślnie', 'success').then(result=>{
        window.location.href='/bookings'
      })
    } catch (error) {
      setloading(false)
      Swal.fire('Ups', 'Coś poszło nie tak', 'error')
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

                    <StripeCheckout
                      amount={totalamount * 100}
                      token={onToken}
                      currency='PLN'
                      stripeKey="pk_test_51LMBCvIacNpxP4wT9ao0UbxdfAH3Ok4dKfXBWZtNc3RSNruQvZVo5YTBevz1KrR8m6DN07GRXkocD9KXo0nZ1V5w00SiPmr9Nj"
                    >
                      <button style={{ float: 'right' }} className='room_btn'> Zarezerwuj</button>
                    </StripeCheckout>
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