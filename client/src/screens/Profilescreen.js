import React, {useState, useEffect} from 'react'
import { Tabs } from 'antd';
import { Divider, Tag } from 'antd';
import axios from 'axios'
import Loader from '../components/Loader'
import Error from '../components/Error'
import Swal from 'sweetalert2'

const { TabPane } = Tabs;

function Profilescreen() {

    const user =(JSON.parse(localStorage.getItem('currentUser'))).data

    useEffect(() => {
        if(!user){
            window.location.href='/login'
        }
    }, [])
    
    return (
        <div>
            <Tabs defaultActiveKey="1" centered>
                <TabPane tab="Profil" key="1">
                <div className='row justify-content-center'>
                <div className= "col-md-6">
                <div className='bx_shadow'> 
                    <h1>Mój profil</h1>
                    <br/>
                    <p><b>Użytkownik:</b> {user.name}</p>
                    <p><b>Email:</b> {user.email}</p>
                </div>
                </div>
                </div>
                </TabPane>
                <TabPane tab="Moje rezerwacje" key="2">
                    <MyBookings/>
                </TabPane>
            </Tabs>
        </div>
    )
}

export default Profilescreen


export function MyBookings() {
    const user =(JSON.parse(localStorage.getItem('currentUser'))).data
    const [loading, setloading] = useState(false)
    const [error, seterror] = useState()
    const [bookings, setbookings] = useState([])

    useEffect(() => {
        try {
            setloading(true)
            async function gettingUsersBookings(){
                const data = (await axios.post('/api/bookings/getbookingsbyuserid', {userid: user._id})).data
                setbookings(data)
                setloading(false)
            }
            gettingUsersBookings() 
        } catch (error) {
            setloading(false)
            seterror(error)
            console.log(error)
        }
    }, [])

    async function cancelBooking(bookingid, roomid){
        try {
            setloading(true)
            const result = await (axios.post('/api/bookings/cancelbooking', {bookingid, roomid})).data
            console.log(result)
            setloading(false)
            Swal.fire('Udało się!', 'Rezerwacja anulowana pomyślnie', 'success').then(resut=>{
                window.location.reload()
            })
        } catch (error) {
            console.log(error)
            setloading(false)
            Swal.fire('Ups', 'Coś poszło nie tak', 'error')
        }
    }

  return (
    <div>
        <div className='row justify-content-center'>
            <div className= "col-md-6">
             {loading && (<Loader/>)}
                {bookings && (bookings.map(booking =>{
                    return<div className='bx_shadow'>
                        <h1>{booking.room}</h1>
                        <p><b>ID Rezerwacji:</b> {booking._id}</p>
                        <p><b>Zameldowanie:</b> {booking.fromdate}</p>
                        <p><b>Wymeldowanie: </b> {booking.todate}</p>
                        <p><b>Barek w pokoju: </b> {booking.barek}</p>
                        <p><b>Dostęp do SPA: </b> {booking.spa}</p>
                        <p><b>Kwota:</b> {booking.totalamount} zł</p>
                        <p><b>Status:</b> {booking.status == 'Aktywna' ? ( <Tag color="lime">Aktywna</Tag>): (<Tag color="red">Anulowana</Tag>)} 
                        {booking.status !== 'Anulowana' &&(
                            <button className='room_btn btn-primary' onClick={()=>{cancelBooking(booking._id, booking.roomid)}} style={{ float: 'right' }} > Anuluj</button>
                        )}
                        </p>
                    </div>
                }))}
            </div>
        </div>
    </div>
  )
}
