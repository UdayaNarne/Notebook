import React,{useEffect} from 'react';
import {Link,useLocation,useNavigation} from 'react-router-dom';

export default function Navbar(){
    const handleClick=()=>{
        if(localStorage.getItem('token')){
            localStorage.removeItem('token');
            window.location.href="/login";
        }
        else if(sessionStorage.getItem('token')){
            sessionStorage.removeItem('token');
            window.location.href="/login";
        }
        //localStorage.removeItem('token');
       
    }
    let location=useLocation();
    useEffect(()=>{
        console.log(location);
    },[location])
    return(
        <>
        <nav className="navbar navbar-expand-lg text-white" style={{backgroundColor:"#4f46e5",color:"white"}}>
        <div className="container-fluid text-white" style={{color:"white"}}>
            <Link className="navbar-brand text-white" to="/">NoteBook</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                    <Link className={`nav-link text-white ${location.pathname==='/'?"active":""} `} aria-current="page" to="/">Home</Link>
                </li>
                <li className="nav-item">
                    <Link className={`nav-link text-white ${location.pathname==='/about'?"active":""}`} to="/about">About</Link>
                </li>
            </ul>
            {!localStorage.getItem('token') && !sessionStorage.getItem('token')?<form className="d-flex " role="search">
                <Link className="btn btn-outline-light mx-3" to="/login"  role="button">Login</Link>
                <Link className="btn btn-light" style={{color:"#4f46e5"}} to="/signup" role="button">Register</Link>
            </form>:<button className="btn btn-outline-success mx-3" onClick={handleClick}>Logout</button>}
            </div>
        </div>
        </nav>
        </>
    )
}