import React,{useState} from 'react';
import {Link} from 'react-router-dom';
import { useNavigate } from "react-router-dom";
export default function SignUp(props){
    const host="http://localhost:8000/";
    let navigate=useNavigate();
    const [credentials,setCredentials]=useState({name:"",email:"",password:"",cpassword:""});
    const onChange=(e)=>{
        setCredentials({
            ...credentials,
            [e.target.name]:e.target.value,
        })
    }
    const handleSubmit=async(e)=>{
        e.preventDefault();
        const URL=host+"api/auth/createuser";
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
                name:credentials.name,
                email:credentials.email,
                password:credentials.password
            })
        })
        const result=await response.json();
        if(result.success){
            console.log("Success");
            localStorage.setItem('token',result.jwtData);
            // localStorage.setItem('token',result.authToken);
            navigate("/login");
            props.showAlert("Login Successful","success");
            // window.location.href="/";
        }
        else{
            props.showAlert("Invalid Credentials","danger");
        }
        console.log("Res:",result);
    }
    return(
        <div className='container'>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">User Name</label>
                    <input type="text" className="form-control" id="name" minLength={5} onChange={onChange} value={credentials.name} name="name"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-control" id="email" onChange={onChange} value={credentials.email} name="email" aria-describedby='emailHelp'/>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" onChange={onChange} minLength={5}  value={credentials.password} id="password" name="password"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" id="cpassword"  minLength={5}  onChange={onChange} value={credentials.cpassword} name="cpassword"/>
                </div>
                <div className="form-check mb-3">
                    <input className="form-check-input" type="checkbox" value="" id="checkDefault"/>
                    <label className="form-check-label" htmlFor="checkDefault">
                        Remember me
                    </label>
                </div>  
                <button type="submit" id="button"  className="btn btn-primary">Submit</button>
        </form>
        </div>
    )
}