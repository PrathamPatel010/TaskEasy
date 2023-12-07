/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import Footer from "./Footer";
import axios from 'axios';
import SpinnerLoader from "./SpinnerLoader";

const Register = () => {
    const base_url = import.meta.env.VITE_BACKEND_URL;

    // managing state values using react-hooks
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [acknowledgment, setAcknowledgment] = useState('');
    const [showLoader, setShowLoader] = useState(false);

    // function to handle login form submission, sending data to backend for processing
    const handleRegister = async (e) => {
        e.preventDefault();
        const dataTobeSend = { username, password };
        setShowLoader(true);
        const response = await axios.post(`${base_url}/api/register`, dataTobeSend, { withCredentials: true });
        setShowLoader(false);
        console.log(response.data);
        if (response.data.status === 400) {
            document.getElementById('ack-div').style.color='red';
            setAcknowledgment(response.data.message);
            return;
        }
        document.getElementById('ack-div').style.color='green';
        setAcknowledgment(response.data.message);
        setUsername('');
        setPassword('');
        window.location.href = "/MainPage";
    }

    return (
        <>
            <div className="container header d-flex justify-content-center align-items-center mt-4 mb-4">
                <h1>TaskEasy - A Todo App</h1>
            </div>
            <div className="container">
                <article className="login-cover">
                    <form onSubmit={handleRegister} className="form-register" method="post">
                        <h1 className="my-3">Register</h1>
                        <input value={username} onChange={(e) => setUsername(e.target.value)} className="form-control mb-3" type="text" placeholder="Username" name="name" autoComplete="on" required />
                        <input value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" type="password" placeholder="password" autoComplete="off" required />
                        {
                            showLoader ? (<SpinnerLoader />) : (<button type="submit" className=" mt-3 btn btn-login btn-primary">Register</button>)
                        }
                    </form>
                    <div id={'ack-div'} className="text-center acknowledgment-div my-3">
                        <h5>{acknowledgment}</h5>
                    </div>
                    <div className="col-12 text-center mt-5">
                        <h5>Already a user?</h5>
                        <h6 className=""><a href="/">Click here to login</a></h6>
                    </div>
                </article>
            </div>
            <Footer />
        </>
    )
}

export default Register;