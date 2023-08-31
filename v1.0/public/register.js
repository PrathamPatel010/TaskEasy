document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('form-register');
    registerForm.addEventListener('submit', async(e) => {
        e.preventDefault();
        const mail = document.getElementById('email').value;
        const pwd = document.getElementById('password').value;
        const data = { mail, pwd };
        await axios.post('/register', data, { withCredentials: true })
            .then((response) => {
                const flag = response.data.flag;
                if (flag == 1) {
                    const acknowledge = document.createElement('div');
                    acknowledge.classList.add('my-3', 'text-center');
                    acknowledge.innerHTML = `
                    <h6>Account already exist</h6>
                    <h6>Wait!! you are being redirected to login!</h6>`
                    registerForm.appendChild(acknowledge);
                    setTimeout(() => {
                        window.location.href = '/';
                    }, 3000);
                } else {
                    document.getElementById('email').value = '';
                    document.getElementById('password').value = '';
                    window.location.href = "/dashboard";
                }
            })
            .catch(err => {
                console.log(err);
            });
    });
});