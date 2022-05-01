import React from 'react'

function Room({room}) {
  console.log(JSON.stringify(room)) 
  return (
    <div className="row">
      <div className='col-md-4'>
          <img src={room.imageurls[0]} alt={room.imageurls[0]} className="smallimg"/>
      </div>
      <div className='col-md-7'>
        <h1>{room.name}</h1>
        <p>Max people: {room.maxcount}</p>
        <p>Phonenumber: {room.phonenumber}</p>
        <p>Type: {room.type}</p>

      </div>
        
    </div>
  )
}

export default Room