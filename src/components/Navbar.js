import React,{useEffect} from 'react';
import {Link,useLocation,useNavigation} from 'react-router-dom';

export default function Navbar(){
    //let Navigate=useNavigation();
    const handleClick=()=>{
        // Navigate("/login");
        localStorage.removeItem('token');
        //Navigate("/login");
        window.location.href="/login";
    }
    let location=useLocation();
    useEffect(()=>{
        console.log(location);
    },[location])
    return(
        <>
        <nav className="navbar navbar-expand-lg bg-body-tertiary bg-dark">
        <div className="container-fluid">
            <Link className="navbar-brand" to="/">NoteBook</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                    <Link className={`nav-link ${location.pathname==='/'?"active":""} `} aria-current="page" to="/">Home</Link>
                </li>
                <li className="nav-item">
                    <Link className={`nav-link ${location.pathname==='/about'?"active":""}`} to="/about">About</Link>
                </li>
            </ul>
            {!localStorage.getItem('token')?<form className="d-flex " role="search">
                <Link className="btn btn-outline-success mx-3" to="/login"  role="button">Login</Link>
                <Link className="btn btn-success" to="/signup" role="button">Register</Link>
            </form>:<button className="btn btn-outline-success mx-3" onClick={handleClick}>Logout</button>}
            </div>
        </div>
        </nav>
        </>
    )
}