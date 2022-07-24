import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Loader from '../components/Loader'
import Error from '../components/Error'
import moment from 'moment'
import Swal from 'sweetalert2'
import StripeCheckout from 'react-stripe-checkout'
import AOS from 'aos'
import 'aos/dist/aos.css';

AOS.init({
  duration:2000
})


function Bookingscreen({ match }) {

  const [loading, setloading] = useState(true)
  const [error, seterror] = useState()
  const [room, setroom] = useState()

  const roomid = match.params.roomid
  const fromdate = moment(match.params.fromdate, 'DD-MM-YYYY')
  const todate = moment(match.params.todate, 'DD-MM-YYYY')
  const totaldays = moment.duration(todate.diff(fromdate)).asDays() + 1
  const [totalamount, settotalamount] = useState()
  const [spa, setspa] = useState('Nie')
  const [barek, setbarek] = useState('Nie')
  const [duplicateprice, setduplicateprice] = useState()

  useEffect(() => {
    if(!localStorage.getItem('currentUser')){
      window.location.reload='/login'
    }
    try {
      setloading(true)
      async function gettingRoom() {
        const data = (await axios.post('/api/rooms/getroombyid', { roomid: match.params.roomid })).data
        setroom(data)
        setloading(false)
        settotalamount(data.rentperday * totaldays)
        setduplicateprice(data.rentperday * totaldays)
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
      barek,
      spa,
      token
    }

    try {
      setloading(true)
      const result = await axios.post('/api/bookings/bookroom', bookingDetails)
      setloading(false)
      Swal.fire('Sukces', 'Pokój zarezerwowany pomyślnie', 'success').then(result=>{
        window.location.href='/home'
      })
    } catch (error) {
      setloading(false)
      Swal.fire('Ups', 'Coś poszło nie tak', 'error')
      console.log(error)
    }
  }

  function isBarek(a){
    setbarek(a)
    if(a=='Tak'){
        const temp = totalamount + 25
        settotalamount(temp)
    }
    else{
      setspa(a)
      settotalamount(duplicateprice)
    }
}

function isSpa(a){
  setspa(a)
  if(a=='Tak'){
      const temp = totalamount + 50
      settotalamount(temp)
  }
  else{
    setbarek(a)
    settotalamount(duplicateprice)
  }
}

  return (
    <div className='m-5' data-aos="zoom-in-up">
      {loading ?
        (<Loader />)
        : room ?
          (
            <div className='outer-div'>
              <div className='inner-div'>
              <div className='row justify-content-center mt-6 bx_shadow'>
                <div>
                  <h1>Szczegóły rezerwacji</h1>
                  <hr></hr>
                  <b>
                    <p>Pokój: {room.name}</p>
                    <p>Od: {match.params.fromdate}</p>
                    <p>Do: {match.params.todate}</p>
                    <p>Dni: {totaldays}</p>
                    <p>Cena za dzień: {room.rentperday} </p>
                    <hr></hr>
                    
                    <p>Usługi dodatkowe:</p>
                    <div className='col-md-3'>
                      <div className='additional-opitons'>
                      Barek w pokoju: 
                      <select className='form-control' value={barek} onChange={(a)=>{isBarek(a.target.value)}}>
                        <option value="Nie"> Nie</option>
                        <option value="Tak"> Tak (25zł)</option>
                      </select>
                    </div>
                   

                      Dostęp do SPA:
                      <select className='form-control' value={spa} onChange={(a)=>{isSpa(a.target.value)}}>
                        <option value="Nie"> Nie</option>
                        <option value="Tak"> Tak (50zł)</option>
                      </select>
                    </div>
            
                    <hr></hr>
                    <p> <center>Suma: {totalamount} zł</center> </p>
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
                  <button style={{ float: 'right' }} className='room_btn' href="/home" > 
                  <a class="room_btn" href="/home" >Anuluj</a>
                  </button>
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