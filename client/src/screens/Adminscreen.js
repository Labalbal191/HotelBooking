import React, { useState, useEffect } from 'react'

import { Tabs } from 'antd';
import axios from 'axios'
import Loader from '../components/Loader'
import Error from '../components/Error'
import { Divider, Tag } from 'antd';
import Swal from 'sweetalert2'
import moment from 'moment'
import ColumnGroup from 'antd/lib/table/ColumnGroup';


const { TabPane } = Tabs;

function Adminscreen() {

    useEffect(() => {
        if (!(JSON.parse(localStorage.getItem('currentUser')).data).isAdmin) {
            window.location = '/home'
        }
    }, [])

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
                        <div className="col-md-6">
                            <div className='bx_shadow'>
                                <Rooms />
                            </div>
                        </div>
                    </div>
                </TabPane>
                <TabPane tab="Dodaj pokój" key="3">
                    <div className='row justify-content-center'>
                        <div className="col-md-8">
                            <div className='bx_shadow'>
                                <Addroom />
                            </div>
                        </div>
                    </div>
                </TabPane>
                <TabPane tab="Usuń pokój" key="4">
                    <div className='row justify-content-center'>
                        <div className="col-md-8">
                            <div className='bx_shadow'>
                                <Deleteroom />
                            </div>
                        </div>
                    </div>
                </TabPane>
                <TabPane tab="Użytkownicy" key="5">
                    <div className='row justify-content-center'>
                        <div className="col-md-6">
                            <div className='bx_shadow'>
                                <Users />
                            </div>
                        </div>
                    </div>
                </TabPane>
                <TabPane tab="Zablokuj użytkownika" key="6">
                    <div className='row justify-content-center'>
                        <div className="col-md-5">
                            <div className='bx_shadow'>
                                <BlockingUserUI/>
                            </div>
                        </div>
                    </div>
                </TabPane>
                <TabPane tab="Odblokuj użytkownika" key="7">
                    <div className='row justify-content-center'>
                        <div className="col-md-5">
                            <div className='bx_shadow'>
                                <UnblockUserUI/>
                            </div>
                        </div>
                    </div>
                </TabPane>
                <TabPane tab="Harmonogram sprzątania" key="8">
                    <div className='row justify-content-center'>
                        <div className="col-md-4">
                            <div className='bx_shadow'>
                                <Cleaning/>
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
            {bookings.length >=1? 
            
       
            (<table className='table table-bordered'>
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
             ): <h1>Obecnie nie ma żadnych rezerwacji</h1>}
        </div>
    )
}

export function Rooms() {
    const [rooms, setrooms] = useState([])
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


export function BlockingUserUI(){
    const [loading, setloading] = useState(true)
    const [error, seterror] = useState()
    const [user, setuser] = useState()
    
    function BlockUser(){  
        const userid= document.getElementById('uservalue').value
        
        console.log(userid)   
        try {
            setloading(true)
            async function gettingUserByID(){
                const result = await (axios.post('/api/users/blockuser', {userid})).data
                setuser(result)
                setloading(false)
            }
            gettingUserByID() 
            Swal.fire('Sukces,', 'Użytkownik został zablokowany', 'success')
        } catch (error) {
            Swal.fire('Ups,', 'coś poszło nie tak', 'error')
            setloading(false)
            seterror(error)
        }
    }

    return (
        <div className='justify-content-center'>
            <div className='justify-content-center'>
                <input type='text' className='input2' placeholder='ID użytkownika do zablokowania'
                id='uservalue'/>
                <button className='cleaning_btn' onClick={()=>BlockUser()}> Zablokuj użytkownika</button>
            </div>
            
        </div>
)
}

export function UnblockUserUI(){
    const [loading, setloading] = useState(true)
    const [error, seterror] = useState()
    const [user, setuser] = useState()
    
    function UnblockUser(){  
        const userid= document.getElementById('uservalue').value
        
        console.log(userid)   
        try {
            setloading(true)
            async function gettingUserByID(){
                const result = await (axios.post('/api/users/unblockuser', {userid})).data
                setuser(result)
                setloading(false)
            }
            gettingUserByID()
            Swal.fire('Sukces,', 'Użytkownik został odblokowany', 'success') 
        } catch (error) {
            Swal.fire('Ups,', 'coś poszło nie tak', 'error')
            setloading(false)
            seterror(error)
        }
    }

    return (
        <div className='justify-content-center'>
            <div className='justify-content-center'>
                <input type='text' className='input2' placeholder='ID użytkownika do odblokowania'
                id='uservalue'/>
                <button className='cleaning_btn' onClick={()=>UnblockUser()}> Odblokuj użytkownika</button>
            </div>
            
        </div>
)
}

export function Users() {
    const [users, setusers] = useState([])
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
                        <th> Status</th>
                    </tr>
                </thead>
                <tbody>
                    {users.length && (users.map(user => {
                        return <tr>
                            <td>{user._id} </td>
                            <td>{user.name} </td>
                            <td>{user.email} </td>
                            <td> {user.isAdmin == true ? (<Tag color="gold">Administrator</Tag>) : (<Tag color="#aeb1b5">Zwykły użytkownik</Tag>)} </td>
                            <td>{user.isAdmin? (<Tag color="gold">Administrator</Tag>) : user.isBlocked ? (<Tag color="red">Zablokowany</Tag>) : (<Tag color="green">Odblokowany</Tag>)} </td>
                        </tr>
                    }))}
                </tbody>
            </table>
        </div>
    )
}

export function Cleaning() {
    const [bookings, setbookings] = useState([])
    const [roomsToClean, setroomsToClean] = useState([])
    const [duplicatebookings, setduplicatebookings] = useState([])
    const [cleanedRooms, setcleanedRooms] = useState([])
    const [loading, setloading] = useState(false)
    const [error, seterror] = useState()
    const today = moment().format('DD-MM-YYYY')
    var testCleaned = []
    var n = 0

    function filterByDate() {
        var temprooms = []

        var today = new Date();
        var day = String(today.getDate()).padStart(2, '0');
        var month = String(today.getMonth() + 1).padStart(2, '0');

        var dayInt = parseInt(day)
        var monthInt = parseInt(month)

        for (var booking of bookings) {
           var fromDateInString = booking.fromdate.toString()
           var toDateInString = booking.todate.toString()
  
           var fromDateDaysAsInt = parseInt(fromDateInString.substr(0,2))
           var fromDateMonthsAsInt = parseInt(fromDateInString.substr(3,2))

           var toDateDaysAsInt = parseInt(toDateInString.substr(0,2))
           var toDateMonthsAsInt = parseInt(toDateInString.substr(3,2))
    
            if (monthInt >= fromDateMonthsAsInt && monthInt <= toDateMonthsAsInt){
                if(dayInt >=fromDateDaysAsInt && dayInt <=toDateDaysAsInt){
                    if(!cleanedRooms.includes(booking)){
                        temprooms.push(booking.room)
                        cleanedRooms.push(booking.room)
                    }       
                }
            }
        }
        setroomsToClean(temprooms)
        setduplicatebookings(temprooms)
        console.log(cleanedRooms)
    }
    function markAsCleaned(id){
        function getelement(){
            var element = document.getElementById(0);
            return element
        }
        window.onload =getelement()
    var elem = getelement()


    if (elem.value=="Posprzątany"){
        elem.value = "Nieposprzątany";
        elem.style.backgroundColor = '#ebeff2'
    } 
    else{
        elem.value = "Posprzątany";
        elem.style.backgroundColor = '#c4f0a3';
    } 

}
    useEffect(() => {
        setloading(true)
        try {
            async function gettingBookings() {
                const data = (await axios.get('/api/bookings/getallbookings')).data
                setbookings(data)
                setloading(false)
            }
            gettingBookings()
            filterByDate()
        }
        catch (error) {
            setloading(false)
            seterror(true)
        }
    }, [])
    return (
        <div className='row justify-content-center' >
            {loading && (<Loader/>)}
            <button className='room_btn btn-primary col-md-4' onClick={filterByDate} > Odśwież liste</button>
            {roomsToClean.length >= 1?  
            (<div className='row justify-content-center'>
                <div className= "col-md-10">

                    {roomsToClean.length && (roomsToClean.map(room =>{
                        return<div className='bx_shadow'>
                            <h1>{room}</h1>
                            <div className='row justify-content-center'>
                                <div className= "col-md-5 ">
                                <input onClick={(n)=>markAsCleaned(n)} type="button" value="Nieposprzątany" id={n}></input>
                                </div>
                            </div>
                            {}
                        </div>

                        
                    }))}
                </div>
            </div>)
            :
            <h1>Obecnie nie ma pokoi do sprzątania</h1>}
        </div>
      )

}

function Addroom() {
    const [loading, setloading] = useState(false)
    const [error, seterror] = useState()

    const[name, setname] = useState('')
    const[people, setpeople] = useState()
    const[rentperday, setrentperday] = useState()
    const[description, setdescription] = useState()
    const[image1, setimage1] = useState()
    const[image2, setimage2] = useState()
    const[image3, setimage3] = useState()
    
    async function addRoom(){
        const newRoom ={
            name,
            people,
            rentperday,
            description,
            imageurls: [image1, image2, image3]
        }
        try{
            setloading(true)
            const result = await (axios.post('/api/rooms/addroom', newRoom)).data
            setloading(false)
            Swal.fire('Sukces!', 'Pokój został dodany pomyślnie', 'success').then(result=>{
                window.location.href="/home"
            })
        }catch(error){
            setloading(false)
            seterror(true)
            console.log(error)
            Swal.fire('Ups,', 'coś poszło nie tak', 'error')
        }
    }

    return (
        <div className='row justify-content-center'>
            {loading && <Loader/>}
            <div className='col-md-5'>
                <input type='text' className='new-room-input' placeholder='Nazwa pokoju'
                value={name} onChange={(e)=>{setname(e.target.value)}}/>
                    
                <input type='number' className='new-room-input' placeholder='Liczba osób'
                value={people} onChange={(e)=>{setpeople(e.target.value)}}/>

                <input type='number' className='new-room-input' placeholder='Cena za dzień'
                value={rentperday} onChange={(e)=>{setrentperday(e.target.value)}}/>

                <input type='text' className='new-room-input' placeholder='Opis'
                value={description} onChange={(e)=>{setdescription(e.target.value)}}/>
            </div>

            <div className='col-md-5'>
                <input type='text' className='new-room-input' placeholder='Zdjęcie 1'
                value={image1} onChange={(e)=>{setimage1(e.target.value)}}/>

                <input type='text' className='new-room-input' placeholder='Zdjęcie 2'
                value={image2} onChange={(e)=>{setimage2(e.target.value)}}/>

                <input type='text' className='new-room-input2' placeholder='Zdjęcie 3'
                value={image3} onChange={(e)=>{setimage3(e.target.value)}}/>

                <div className='centered'>
                <button className='room_btn2 btn-primary m-3' onClick={addRoom}> Dodaj nowy pokój</button>
                </div>
            </div>
        </div>
    )
}


export function Deleteroom(){
    const [loading, setloading] = useState(true)
    const [error, seterror] = useState()
    
    function DeleteRoom(){  
        const roomid= document.getElementById('roomvalue').value
        
        console.log(roomid)   
        try {
            setloading(true)
            async function deletingRoom(){
                const result = await (axios.post('/api/rooms/deleteroom', {roomid})).data
                setloading(false)
            }
            deletingRoom() 
            Swal.fire('Sukces,', 'Pokój został usunięty!', 'success')
        } catch (error) {
            Swal.fire('Ups,', 'coś poszło nie tak', 'error')
            setloading(false)
            seterror(error)
        }
    }

    return (
        <div className='justify-content-center'>
            <div className='justify-content-center'>
                <input type='text' className='input2' placeholder='ID pokoju do usunięcia'
                id='roomvalue'/>
                <button className='cleaning_btn' onClick={()=>DeleteRoom()}> Usuń pokój</button>
            </div>
            
        </div>
)
}