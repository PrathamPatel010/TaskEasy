const { default: axios } = require("axios");
const form = document.getElementById('form-login');


document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('form-login');
    const regiForm = document.getElementById('form-register');
    loginForm.addEventListener('submit', async(e) => {
        e.preventDefault();
        const userName = document.getElementById('username').value;
        const pwd = document.getElementById('password').value;
        const userCredentials = {
            name: userName,
            password: pwd
        };
        try {
            const response = await axios.post('/login', userCredentials);
            window.location.href = '/dashboard';
        } catch (err) {
            console.log(err);
        }
    })
    regiForm.addEventListener('submit', async(e) => {
        e.preventDefault();
        const mail = document.getElementById('email').value;
        const userName = document.getElementById('username').value;
        const pwd = document.getElementById('password').value;
        const newUserData = {
            email: mail,
            name: userName,
            password: pwd,
        };
        try {
            const response = await axios.post('/register', newUserData);
            window.location.href = '/dashboard'
        } catch (err) {
            console.log(err);
        }
    })
})