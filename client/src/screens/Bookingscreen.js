import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Loader from '../components/Loader'
import Error from '../components/Error'

function Bookingscreen({ match }) {

  const [loading, setloading] = useState(true)
  const [error, seterror] = useState()
  const [room, setroom] = useState()

  useEffect(() => {
    try {
      setloading(true)
      async function gettingRoom() {
        const data = (await axios.post('/api/rooms/getroombyid', { roomid: match.params.roomid })).data
        setroom(data)
        setloading(false)
      }
      gettingRoom()
    }
    catch (error) {
      seterror(true)
      console.log(error)
      setloading(false)
    }
  }, [])

  return (
    <div className='m-5'>
      {loading ?
        (<Loader />)
        : room ?
          (
            <div>
            <div className='row justify-content-center mt-6 bx_shadow'>
              <div className='col-md-6'>
                <h1>{room.name}</h1>
                <img src={room.imageurls[0]} classname='fullsizeimg' />
              </div>

              <div className='col-md-6'>
                <h1>Details</h1>
                <hr></hr>
                <b>
                  <p>Name: </p>
                  <p>From: </p>
                  <p>To: </p>
                  <p>Days: </p>
                  <p>Price per day: {room.rentperday} </p>
                  <p>Amount: </p>
                </b>
                <div>
                  <button style={{ float: 'right' }} className='room_btn'> Pay now</button>
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