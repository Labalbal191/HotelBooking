import React, { useState } from 'react'
import { Modal, Button, Carousel } from 'react-bootstrap'
import {Link} from 'react-router-dom'

function Room({ room, fromdate, todate }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="row bx_shadow">
      <div className='col-md-4'>
        <img src={room.imageurls[0]} alt={room.imageurls[0]} className="smallimg" />
      </div>
      <div className='col-md-8'>
        <h1>{room.name}</h1>
        <b>
          <p>Max people: {room.maxcount}</p>
          <p>Phonenumber: {room.phonenumber}</p>
          <p>Type: {room.type}</p>
        </b>
        <div style={{ float: 'right'}}>
          <button className='room_btn btn-primary m-3' onClick={handleShow}> Zobacz pokój</button>
          <Link to ={`/book/${room._id}/${fromdate}/${todate}`}>
          <button className='room_btn btn-primary' > Zarezerwuj</button>
          </Link>
          
        </div>
      </div>

      <Modal show={show} onHide={handleClose} size='lg'>
        <Modal.Header closeButton>
          <Modal.Title>{room.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Carousel>
            {room.imageurls.map(url => {
              return <Carousel.Item>
                <img
                  className="d-block fullsizeimg"
                  src={url}
                />
              </Carousel.Item>
            })}
          </Carousel>
          <p>{room.description}</p>
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default Room