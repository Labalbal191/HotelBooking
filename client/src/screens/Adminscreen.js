import React, { useState, useEffect } from 'react'
import { Tabs } from 'antd';
import axios from 'axios'
import Loader from '../components/Loader'
import Error from '../components/Error'
import { Divider, Tag } from 'antd';

const { TabPane } = Tabs;

function Adminscreen() {

    useEffect(() =>{
        if(!(JSON.parse(localStorage.getItem('currentUser')).data).isAdmin){
            window.location='/home'
        }
    },[])

    return (
        <div>
            <Tabs defaultActiveKey="1" centered>

                <TabPane tab="Rezerwacje" key="1">
                    <div className='row justify-content-center'>
                        <div className="col-md-10">
                            <div className='bx_shadow'>
                                <Bookings />
                            </div>
                        </div>
                    </div>
                </TabPane>
                <TabPane tab="Pokoje" key="2">
                    <div className='row justify-content-center'>
                        <div className="col-md-10">
                            <div className='bx_shadow'>
                                <Rooms/>
                            </div>
                        </div>
                    </div>
                </TabPane>
                <TabPane tab="Dodaj pokój" key="3">
                    <div className='row justify-content-center'>
                        <div className="col-md-10">
                            <div className='bx_shadow'>
                                Dodaj pokój
                            </div>
                        </div>
                    </div>
                </TabPane>
                <TabPane tab="Użytkownicy" key="4">
                    <div className='row justify-content-center'>
                        <div className="col-md-10">
                            <div className='bx_shadow'>
                                <Users/>
                            </div>
                        </div>
                    </div>
                </TabPane>
                <TabPane tab="Harmonogram sprzątania" key="5">
                    <div className='row justify-content-center'>
                        <div className="col-md-10">
                            <div className='bx_shadow'>
                                Harmonogram sprzątania
                            </div>
                        </div>
                    </div>
                </TabPane>
            </Tabs>
        </div>
    )
}

export default Adminscreen

export function Bookings() {
    const [bookings, setbookings] = useState([])
    const [loading, setloading] = useState(false)
    const [error, seterror] = useState()

    useEffect(() => {
        setloading(true)
        try {
            async function gettingBookings() {
                const data = (await axios.get('/api/bookings/getallbookings')).data
                setbookings(data)
                setloading(false)
            }
            gettingBookings()
        }
        catch (error) {
            setloading(false)
            seterror(true)
        }
}, [])

    return (
        <div className="row">
            {loading && (<Loader />)}
            <table className='table table-bordered'>
                <thead class="bx_shadow">
                    <tr>
                        <th> ID Rezerwacji</th>
                        <th> ID Klienta</th>
                        <th> Pokój</th>
                        <th> Zameldowanie</th>
                        <th> Wymeldowanie</th>
                        <th> Barek w pokoju</th>
                        <th> Dostęp do SPA</th>
                        <th> Kwota</th>
                        <th> Status</th>
                    </tr>
                </thead>
                <tbody>
                    {bookings.length && (bookings.map(booking => {
                        return <tr>
                            <td> {booking._id}</td>
                            <td> {booking.userid}</td>
                            <td> {booking.room}</td>
                            <td> {booking.fromdate}</td>
                            <td> {booking.todate}</td>
                            <td> {booking.barek}</td>
                            <td> {booking.spa}</td>
                            <td> {booking.totalamount} zł</td>
                            <td> {booking.status == 'Aktywna' ? (<Tag color="lime">Aktywna</Tag>) : (<Tag color="red">Anulowana</Tag>)} </td>

                        </tr>
                    }))}
                </tbody>
            </table>
        </div>
    )
}

export function Rooms(){
    const[rooms, setrooms] = useState([])
    const [loading, setloading] = useState(false)
    const [error, seterror] = useState()

    useEffect(() => {
        setloading(true)
        try {
            async function gettingRooms() {
                const data = (await axios.get('/api/rooms/getallrooms')).data
                setrooms(data)
                setloading(false)
            }
            gettingRooms()
        }
        catch (error) {
            setloading(false)
            seterror(true)
        }
    }, [])
return (
    <div className="row">
        {loading && (<Loader />)}
        <table className='table table-bordered'>
            <thead class="bx_shadow">
                <tr>
                    <th> ID Pokoju</th>
                    <th> Nazwa</th>
                    <th> Liczba osób</th>
                    <th> Cena</th>
                </tr>
            </thead>
            <tbody>
                {rooms.length && (rooms.map(room => {
                    return <tr>
                        <td>{room._id} </td>
                        <td>{room.name} </td>
                        <td>{room.people} </td>
                        <td>{room.rentperday} zł </td>
                    </tr>
                }))}
            </tbody>
        </table>
    </div>
)
}

export function Users(){
    const[users, setusers] = useState([])
    const [loading, setloading] = useState(false)
    const [error, seterror] = useState()

    useEffect(() => {
        setloading(true)
        try {
            async function gettingRooms() {
                const data = (await axios.get('/api/users/getallusers')).data
                setusers(data)
                setloading(false)
            }
            gettingRooms()
        }
        catch (error) {
            setloading(false)
            seterror(true)
        }
    }, [])

return (
    <div className="row">
        {loading && (<Loader />)}
        <table className='table table-bordered'>
            <thead class="bx_shadow">
                <tr>
                    <th> ID</th>
                    <th> Nazwa</th>
                    <th> Email</th>
                    <th> Typ użytkownika</th>
                </tr>
            </thead>
            <tbody>
                {users.length && (users.map(user => {
                    return <tr>
                        <td>{user._id} </td>
                        <td>{user.name} </td>
                        <td>{user.email} </td>
                        <td> {user.isAdmin == true ? (<Tag color="gold">Administrator</Tag>) : (<Tag color="#aeb1b5">Zwykły użytkownik</Tag>)} </td>

                    </tr>
                }))}
            </tbody>
        </table>
    </div>
)
}

export function Cleaning(){
    const[roomsToClean, setroomsToClean] = useState([])
    const [loading, setloading] = useState(false)
    const [error, seterror] = useState()

    useEffect(() => {
        setloading(true)
        try {
            async function gettingRoomsToClean() {
                const data = (await axios.get('/api/rooms/getroomstoclean')).data
                setroomsToClean(data)
                setloading(false)
            }
            gettingRoomsToClean()
        }
        catch (error) {
            setloading(false)
            seterror(true)
        }
    }, [])
return (
    <div className="row">
        {loading && (<Loader />)}
        <table className='table table-bordered'>
            <thead class="bx_shadow">
                <tr>
                    <th> ID Pokoju</th>
                    <th> Nazwa</th>
                    <th> Liczba osób</th>
                    <th> Cena</th>
                </tr>
            </thead>
            <tbody>
                {roomsToClean.length && (roomsToClean.map(room => {
                    return <tr>
                        <td>{room._id} </td>
                        <td>{room.name} </td>
                        <td>{room.people} </td>
                        <td>{room.rentperday} zł </td>
                    </tr>
                }))}
            </tbody>
        </table>
    </div>
)
}