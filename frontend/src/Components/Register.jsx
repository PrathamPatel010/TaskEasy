import { useState } from "react";
import Footer from "./Footer";

const Register = () => {
    // managing state values using react-hooks
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');

    // function to handle login form submission, sending data to backend for processing
    const handleLogin = async(e) => {
        e.preventDefault();
        const dataTobeSend = {username,password};
        console.log(dataTobeSend);
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
                <form onSubmit={handleLogin} className="form-register" method="post">
                    <h1 className="my-3">Register</h1>
                    <input value={username} onChange={(e)=>setUsername(e.target.value)} className="form-control mb-3" type="text" placeholder="Username" name="name" autoComplete="on" required/>
                    <input value={password} onChange={(e)=>setPassword(e.target.value)} className="form-control" type="password" placeholder="password" autoComplete="off" required/>                 
                    <button type="submit" className=" mt-3 btn btn-login btn-primary">Login</button>
                </form>
            </article>
        </div>
        <Footer/>
        </>
    )
}

export default Register;