document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('form-register');
    registerForm.addEventListener('submit', async(e) => {
        e.preventDefault();
        const mail = document.getElementById('email').value;
        const pwd = document.getElementById('password').value;
        const data = { mail, pwd };
        await axios.post('/register', data, { withCredentials: true })
            .then((response) => {
                document.getElementById('email').value = '';
                document.getElementById('password').value = '';
                window.location.href = "/dashboard";
            })
            .catch(err => {
                console.log(err);
            });
    });
});