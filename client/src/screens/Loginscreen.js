import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Loader from '../components/Loader'
import Error from '../components/Error'

function Loginscreen() {

    const[email, setemail] = useState('')
    const[password, setpassword] = useState('')

    const [loading, setloading] = useState(false)
    const [error, seterror] = useState()
    const [banned, setbanned] = useState(false)

    async function Login(){
            const user={
                email,
                password
            }
            try{
              setloading(true)

              const test = await axios.post('/api/users/checkifuserblocked', user)

              if(test.data=="Zablokowany"){
                seterror(false)
                setloading(false)
                setbanned(true)
              }
              else{ 
                seterror(false)
                const result = await axios.post('/api/users/login', user)
                setloading(false)
    
                localStorage.setItem('currentUser', JSON.stringify(result))
                window.location.href='/home'
              }
            }
            catch(error){
              setloading(false)
              seterror(true)   
              console.log(error)
            }            
    }

  return (
    <div>
      {loading && (<Loader/>)}
       <div className ="row justify-content-center mt-5">
            <div className='col-md-2 mt-5'>
              {error && (<Error message = 'Nieprawidłowy email lub hasło'/>)}
              {banned && (<Error message = 'Użytkownik został zablokowany'/>)}
                <div>
                    <h1>Zaloguj</h1>
                    <input type="text" className='form-control' placeholder='Email'
                    value={email} onChange={(e)=>{setemail(e.target.value)}}/>

                    <input type="password" className='form-control' placeholder='Hasło'
                    value={password} onChange={(e)=>{setpassword(e.target.value)}}/>

                    <button className='room_btn' onClick={Login} style={{ float: 'right'}}> Zaloguj</button>
                </div>
            </div>
       </div>
    </div>
  )
}

export default Loginscreen