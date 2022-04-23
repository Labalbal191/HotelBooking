import React, {useState, useEffect} from 'react'
import axios from 'axios'

function Homescreen() {
    
    const[rooms, setrooms] = useState([])
   
    useEffect(() => {   
        try {
            async function gettingRooms(){     
                const data = (await axios.get('./api/rooms/getallrooms')).data
                setrooms(data)
              }
              gettingRooms()
        }
        catch (error) {
            console.log(error)
        }   
    },[])

  return (
    <div> 
        <h1>Home</h1>
        <h1>pokoje:{rooms.length}</h1>
    </div>
  )
}

export default Homescreen