import React from 'react'

function Navbar() {

    const user = JSON.parse(localStorage.getItem('currentUser'))
    
    function isAdmin(){
        const user2 = (JSON.parse(localStorage.getItem('currentUser'))).data
        if(user2.isAdmin)
            return true
        else
            return false     
    }
    
    function logout(){
        localStorage.removeItem('currentUser')
        window.location.href='/login'
    }

    return (
        <div>
            <nav class="navbar navbar-expand-lg">
            <div className='outer-div2'>
              <div className='inner-div2'>
              <div className=' justify-content-center'>
                    <a class="navbar-brand" href="/home" >NoBoCoTel</a>
                    </div>
                    </div>
                    </div>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav">
                    {user ? isAdmin()? (
                            <>
                                <li class="nav-item">
                                    <a class="nav-link" href="/admin">
                                        Panel Administratora
                                    </a>
                                </li>
                                <li class="nav-item">
                                        <a class="nav-link" href="#" onClick={(logout)}>
                                            Wyloguj się
                                        </a>
                                </li>
                                    </>
                            ) : (
                            <>
                                <li class="nav-item">
                                    <a class="nav-link" href="/profile">
                                        Mój profil
                                    </a>
                                </li>
                                <li class="nav-item">
                                        <a class="nav-link" href="#" onClick={(logout)}>
                                            Wyloguj się
                                        </a>
                                </li>
                                    </>
                            ): (
                                <>                  
                                <li class="nav-item">
                                    <a class="nav-link" href="/register">
                                        Zarejestruj się
                                    </a>
                                </li>
                                <li class="nav-item">
                                        <a class="nav-link" href="/login">
                                            Zaloguj
                                        </a>
                                </li>
                                    </>
                            )}
                    </ul>
                </div>
            </nav>
        </div>
    )
}

export default Navbar