import React, { useState } from 'react'
import { Modal, Button, Carousel } from 'react-bootstrap'

function Room({ room }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="row bx_shadow">
      <div className='col-md-4'>
        <img src={room.imageurls[0]} alt={room.imageurls[0]} className="smallimg" />
      </div>
      <div className='col-md-7'>
        <h1>{room.name}</h1>
        <b>
          <p>Max people: {room.maxcount}</p>
          <p>Phonenumber: {room.phonenumber}</p>
          <p>Type: {room.type}</p>
        </b>
        <div style={{ float: 'right' }}>
          <button className='details_btn btn-primary' onClick={handleShow}> See the details</button>
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