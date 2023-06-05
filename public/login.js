document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('form-login');
    loginForm.addEventListener('submit', async(e) => {
        e.preventDefault();
        const mail = document.getElementById('email').value;
        const pwd = document.getElementById('password').value;
        const data = { mail, pwd };
        const loginButton = document.getElementById('btn-login');
        await axios.post('/login', data, { withCredentials: true })
            .then((response) => {
                const flag = response.data.flag;
                const acknowledge = document.createElement('div');
                acknowledge.classList.add('py-3');
                if (flag == 401) {
                    document.getElementById('password').value = '';
                    acknowledge.innerHTML = `
                    <h6>Wrong E-mail OR Password.</h6>
                    <h6>Please provide correct information</h6>`
                    loginButton.appendChild(acknowledge);
                    setTimeout(() => {
                        loginButton.removeChild(acknowledge);
                    }, 3000);
                } else if (flag == 404) {
                    document.getElementById('email').value = '';
                    document.getElementById('password').value = '';
                    acknowledge.classList.add('py-3');
                    acknowledge.innerHTML = `
                    <h6>E-mail not found.</h6>
                    <h6>You need to Sign-up</h6>`
                    loginButton.appendChild(acknowledge);
                    setTimeout(() => {
                        loginButton.removeChild(acknowledge);
                    }, 3000);
                } else {
                    document.getElementById('email').value = '';
                    document.getElementById('password').value = '';
                    window.location.href = "/dashboard";
                }
            })
            .catch((err) => {
                console.log(err);
            })
    })
});