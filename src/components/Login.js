import React,{useState} from 'react';
import {Link} from 'react-router-dom';
import { useNavigate } from "react-router-dom";
export default function Login(props){
    const host="http://localhost:8000/";
    let navigate=useNavigate();
    const [credentials,setCredentials]=useState({email:"",password:""});
    const onChange=(e)=>{
        setCredentials({
            ...credentials,
            [e.target.name]:e.target.value
        })
    }
    const handleSubmit=async(e)=>{
        e.preventDefault();
        const URL=host+"api/auth/login"
        const response=await fetch(URL,{
            method:'POST',
            mode:'cors',
            cache:'no-cache',
            credentials:'same-origin',
            headers:{
            'Content-Type':'application/json',
            },
            redirect:'follow',
            referrerPolicy:'no-referrer',
            body:JSON.stringify({
                email:credentials.email,
                password:credentials.password
            })
        })
        const result=await response.json();
        if(result.success){
            localStorage.setItem('token',result.authToken);
            props.showAlert("Login Successful","success");
            //console.log(result);
            navigate("/");
            
            // alert("Login Successful");
            // window.location.href="/";
        }
        else{
            props.showAlert("Invalid Credentials","danger");
        }
        
    }
    return(
        <>
        <form onSubmit={(e)=>handleSubmit(e)}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-control" id="email" name="email" value={credentials.email} onChange={onChange} aria-describedby='emailHelp'/>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" value={credentials.password} onChange={onChange} name="password"/>
                </div>
                <div className="form-check mb-3">
                    <input className="form-check-input" type="checkbox" value="" id="checkDefault"/>
                    <label className="form-check-label" htmlFor="checkDefault">
                        Remember me
                    </label>
                </div>  
                <button type="submit" id="button"  className="btn btn-primary">Submit</button>
        </form>
        
        </>
    )
}