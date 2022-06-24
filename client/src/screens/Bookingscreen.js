import React, {useState, useEffect} from 'react'
import axios from 'axios'

function Bookingscreen({match}) {

  const [loading, setloading] = useState()
  const [error, seterror] = useState()
  const [room, setroom] = useState()

  useEffect(() => {
    try {
        setloading(true)
        async function gettingRoom() {
            const data = (await axios.post('./api/rooms/getroombyid', {roomid : match.params.roomid})).data
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
    <div>
        <h1>Bookingscreen</h1>
        <h1>Room id = {match.params.roomid}</h1>
    </div>
  )
}

export default Bookingscreen