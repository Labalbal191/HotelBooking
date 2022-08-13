import React, { useState } from 'react'
import { Modal, Button, Carousel } from 'react-bootstrap'
import { Link } from "react-router-dom"
import AOS from 'aos'
import 'aos/dist/aos.css';

AOS.init({
  duration:2000
})

function Room({ room, fromdate, todate }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  return (
    <div className="row bx_shadow" data-aos="zoom-in-up">
      <div className='col-md-4'>
        <div className='imageHomescreen'>
          <img src={room.imageurls[0]} alt={room.imageurls[0]} className="smallimg" />
        </div>
        
      </div>
      <div className='col-md-8'>
        <h1>{room.name}</h1>
        <b>
          <p className='p_home'>Liczba osób: {room.people}</p>
          <p className='p_home'>Cena: {room.rentperday} zł</p>
          <p className='p_home2'>{room.description}</p>
          <div style={{ float: 'right' }}>
          <button className='room_btn btn-primary m-3' onClick={handleShow}> Zobacz pokój</button>
          {(fromdate && todate && localStorage.getItem('currentUser')) &&
            (<Link to={`/book/${room._id}/${fromdate}/${todate}`}>
              <button className='room_btn btn-primary' onClick="window.location.reload()" > Zarezerwuj</button>
              
            </Link>)
          }
        </div>
        </b>
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
          <p className='p_home2'>{room.description}</p>
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default Room