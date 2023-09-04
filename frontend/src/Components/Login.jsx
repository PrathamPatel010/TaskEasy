/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import Footer from "./Footer";
import axios from 'axios';

const Login = () => {
    const base_url = import.meta.env.VITE_BACKEND_URL;

    // managing state values using react-hooks
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    const [acknowledgment,setAcknowledgment] = useState('');

    // function to handle login form submission, sending data to backend for processing
    const handleLogin = async(e) => {
        e.preventDefault();
        const dataTobeSend = {username,password};
        const response = await axios.post(`${base_url}/login`,dataTobeSend);
        console.log(response.data);
        if(response.data.status===404 || response.data.status===501){
            setAcknowledgment(response.data.message);
            return;
        }
        setAcknowledgment(response.data.message);
        setUsername('');
        setPassword('');
    }

    return(
        <>
        <div className="container header d-flex justify-content-center align-items-center mt-4 mb-4">
            <h1>TaskEasy - A Todo App</h1>
        </div>
        <div className="container">
            <article className="login-cover">
                <form onSubmit={handleLogin} className="form-login mb-4" method="post">
                    <h1 className="my-3">Login</h1>
                    <input value={username} className="form-control mb-3" type="text" placeholder="Username" name="name" autoComplete="on" onChange={(e)=>setUsername(e.target.value)} required/>
                    <input value={password} className="form-control" type="password" placeholder="password" autoComplete="off" onChange={(e)=>setPassword(e.target.value)} required/>                 
                    <button type="submit" className=" mt-3 btn btn-login btn-primary">Login</button>
                </form>
                <div className="text-center acknowledgment-div">
                    <h5>{acknowledgment}</h5>
                </div>
                <div className="col-12 mt-4 pt-3 text-center">
                    <h5>Don't have account yet?</h5>
                    <h6><a href="/register">Click here to register</a></h6>
                </div>
            </article>
        </div>
        <Footer/>
        </>
    )
}

export default Login;