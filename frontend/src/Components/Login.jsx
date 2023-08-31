import { useState } from "react";
import Footer from "./Footer";

const Login = () => {
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
                <form onSubmit={handleLogin} className="form-login" method="post">
                    <h1 className="my-3">Login</h1>
                    <input value={username} className="form-control mb-3" type="text" placeholder="Username" name="name" autoComplete="on" onChange={(e)=>setUsername(e.target.value)} required/>
                    <input value={password} className="form-control" type="password" placeholder="password" autoComplete="off" onChange={(e)=>setPassword(e.target.value)} required/>                 
                    <button type="submit" className=" mt-3 btn btn-login btn-primary">Login</button>
                </form>
            </article>
        </div>
        <Footer/>
        </>
    )
}

export default Login;