import React, {useState, useEffect} from 'react'
import axios from 'axios'

function Registerscreen() {

    const[name, setname] = useState('')
    const[email, setemail] = useState('')
    const[password, setpassword] = useState('')
    const[passconf, setpassconf] = useState('')
    
    async function register(){
        if(password == passconf){
            const user={
                name,
                email,
                password,
                passconf
            }
            try{
                const result = await axios.post('/api/users/register', user).data
            }catch(error){   
                console.log(error)
            }
        }
        else{
            alert("Hasła nie są takie same")
        }
    }

  return (
    <div>
       <div className ="row justify-content-center mt-5">
            <div className='col-md-2 mt-5'>
                <div>
                    <h1>Zarejestruj się</h1>
                    <input type="text" className='form-control' placeholder='Nazwa użytkownika'
                    value={name} onChange={(e)=>{setname(e.target.value)}}/>

                    <input type="text" className='form-control' placeholder='Email'
                    value={email} onChange={(e)=>{setemail(e.target.value)}}/>

                    <input type="password" className='form-control' placeholder='Hasło'
                    value={password} onChange={(e)=>{setpassword(e.target.value)}}/>

                    <input type="password" className='form-control' placeholder='Potwierdź hasło'
                    value={passconf} onChange={(e)=>{setpassconf(e.target.value)}}/>

                    <button className='room_btn' onClick={register} style={{ float: 'right'}}> Zarejestruj się</button>
                </div>
            </div>
       </div>
    </div>
  )
}

export default Registerscreen