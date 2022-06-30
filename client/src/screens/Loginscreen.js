import React, {useState, useEffect} from 'react'
import axios from 'axios'

function Loginscreen() {

    const[email, setemail] = useState('')
    const[password, setpassword] = useState('')

    async function Login(){
            const user={
                email,
                password
            }
            try{
              const result = await axios.post('/api/users/login', user).data
            }catch(error){   
              console.log(error)
            }
            console.log(user)
            
    }

  return (
    <div>
       <div className ="row justify-content-center mt-5">
            <div className='col-md-2 mt-5'>
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