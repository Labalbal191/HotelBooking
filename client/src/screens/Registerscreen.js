import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Loader from '../components/Loader'
import Error from '../components/Error'
import Success from '../components/Success'


function Registerscreen() {

    const[name, setname] = useState('')
    const[email, setemail] = useState('')
    const[password, setpassword] = useState('')
    const[passconf, setpassconf] = useState('')

    const [loading, setloading] = useState(false)
    const [error, seterror] = useState()
    const [errorPass, seterrorPass] = useState(false)
    const [errorData, seterrorData] = useState(false)
   // const [errorSameUser, seterrorSameUser] = useState(false)
    const [success, setsuccess] = useState()
    
    function isEmpty(str) {
        return (!str || str.length === 0 );
    }

    async function register(){
        seterrorData(false)
        seterrorPass(false)
        if(isEmpty(name) || isEmpty(email) || isEmpty(password) || isEmpty(passconf)){
            seterrorData(true)
        }
        else if(password == passconf){
            const user={
                name,
                email,
                password,
                passconf
            }
            try{
                    setloading(true)
                    const result = await axios.post('/api/users/register', user).data
                    setloading(false)
                    setsuccess(true)
                    
                    setname('')
                    setemail('')
                    setpassword('')
                    setpassconf('')


            }catch(error){
                console.log(error)
                setloading(false)
                seterror(true)
            }
        }
        else{
           seterrorPass(true)
        }
    }

  return (
    <div >
        {loading && (<Loader/>)}
        
        <div className ="row justify-content-center mt-5">
            <div className='col-md-2 mt-5' >
                
                {errorPass&&<Error message ='Hasła muszą być jednakowe'/>}   
                {errorData&& <Error message ='Nie podano wszystkich danych'/>}  

                {error &&<Error message ='Ups, coś poszło nie tak'/>}  
                {success && (<Success message ='Zarejestrowano pomyślnie'/>)}
                
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

                    <button  className='room_btn' onClick={register} style={{ float: 'right'}}> Zarejestruj się</button>
                </div>
            </div>
       </div>
    </div>
  )
}

export default Registerscreen