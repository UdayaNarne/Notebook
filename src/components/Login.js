import React,{useState} from 'react';
import {Link} from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import './login.css';
export default function Login(props){
    const host="http://localhost:8000/";
    let navigate=useNavigate();
    const [credentials,setCredentials]=useState({email:"",password:"",remember:false});
    const onChange=(e)=>{
        //console.log(e.target.checked);
        setCredentials({
            ...credentials,
            [e.target.name]:e.target.value
        })
    }
    const handleCheck=(e)=>{
        console.log(e.target.checked);
        setCredentials({
            ...credentials,
            [e.target.name]:e.target.checked
        })
        //console.log(e.target.checked);
        //setCredentials(updatedCredentials); 
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
                password:credentials.password,
                // checked:credentials.remember
            })
        })
        const result=await response.json();
        console.log(result);
        if(result.success && credentials.remember){
            localStorage.setItem('token',result.authToken);
            props.showAlert("Login Successful","success");
            console.log(credentials.remember);
            navigate("/");
        }
        else if(result.success && !credentials.remember){
            sessionStorage.setItem('token',result.authToken);
            props.showAlert("Login Successful","success");
            console.log(credentials.remember);
            navigate("/");
        }
        else{
            props.showAlert("Invalid Credentials","danger");
        }
        
    }
    return(
        <div className="udaya">
        {/* <div class="login-container">
            <div class="login-header">
                <h2>Welcome Back</h2>
                <p>Please sign in to continue</p>
            </div>
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
        </div> */}
        <div className="login-container2">
        <div className="login-container">
            <div className="login-header">
                <h1>NoteBOOK</h1>
                <p className="subtitle">Keep your ideas, thoughts, and inspirations here.</p>
            </div>
            
            <form className="login-form" onSubmit={(e)=>handleSubmit(e)}>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <div className="input-with-icon">
                    <i className="fa-solid fa-envelope"></i>
                        <input type="text" id="email" name="email" placeholder="abc@gmail.com"  value={credentials.email} onChange={onChange} required/>
                    </div>
                </div>
                
                <div className="form-group">
                    <div className="password-header">
                        <label htmlFor="password">Password</label>
                        <a href="#" className="forgot-password">Forgot password?</a>
                    </div>
                    <div className="input-with-icon">
                        <i className="fas fa-lock"></i>
                        <input type="password" id="password" name="password" value={credentials.password} onChange={onChange} placeholder="abc@12345" required/>
                    </div>
                </div>
                
                <div className="remember-me">
                    <input type="checkbox" id="remember" name="remember" checked={credentials.remember} onChange={handleCheck} />
                    <label htmlFor="remember">Remember me</label>
                </div>
                
                <button type="submit" className="login-button">Login</button>
                
                <div className="divider">
                    <span>or continue with</span>
                </div>
                
                <div className="social-login">
                    <button type="button" className="social-button google">
                        <i className="fab fa-google"></i>
                        <span>Google</span>
                    </button>
                </div>
                
                <div className="register-link">
                    <p>Don't have an account? <Link href="/register" to="/signup">Sign up</Link></p>
                </div>
            </form>
        </div>
        
        <div className="image-container">
            <div className="image-overlay"></div>
            <div className="content">
                <h2>Write.. Edit.. Delete..</h2>
                <div className="feature-list">
                    <div className="feature">
                        <div className="icon-circle">
                            <i className="fas fa-lightbulb"></i>
                        </div>
                        <div className="feature-text">
                            <h3>Write. Remember. Repeat.</h3>
                            <p>Stay organized and never let a good idea slip away!</p>
                        </div>
                    </div>
                    <div className="feature">
                        <div className="icon-circle">
                            <i className="fas fa-code-branch"></i>
                        </div>
                        <div className="feature-text">
                            <h3>Think Freely</h3>
                            <p>Jot down notes, dreams, and plans without limits.</p>
                        </div>
                    </div>
                    <div className="feature">
                        <div className="icon-circle">
                            <i className="fas fa-rocket"></i>
                        </div>
                        <div className="feature-text">
                            <h3>Organize Your Mind</h3>
                            <p>Structure your notes effortlessly and access them anywhere.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
        </div> 
    )
}