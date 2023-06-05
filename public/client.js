window.addEventListener('load', async() => {
    let logoutBtn
    let acknowledge
    const form = document.querySelector('#task-main');
    const taskName = document.querySelector('#task-name');
    const li_ele = document.querySelector('.tasks');
    const heading = document.getElementById('pageHeading');
    await axios.get('/user', { withCredentials: true })
        .then((response) => {
            acknowledge = document.createElement('div');
            acknowledge.classList.add('my-3');
            const emailInfo = response.data.email;
            if (!emailInfo) {
                acknowledge.innerHTML = `<h6>Not Logged in</h6>`;
                heading.appendChild(acknowledge)
            } else {
                acknowledge.innerHTML = `
            <h6>Logged in as ${response.data.email}</h6>`;
                heading.appendChild(acknowledge);
                logoutBtn = document.createElement('btn');
                logoutBtn.innerText = 'Log Out'
                logoutBtn.classList.add('btn', 'btn-success', 'text-center', 'my-2');
                acknowledge.appendChild(logoutBtn);
            }
        })
        .catch((err) => {
            console.log(err);
        });

    logoutBtn.addEventListener('click', async() => {
        await axios.post('/logout', {}, { withCredentials: true })
            .then(() => {
                acknowledge.innerHTML = `<h6>Not Logged in</h6>`;
            })
            .catch((err) => {
                console.log(err);
            })
    })

    form.addEventListener('submit', async(e) => {
        e.preventDefault();
        const task = taskName.value;
        axios.post('/tasks', ({ name: task }))
            .then(response => {
                const task_el = document.createElement('div');
                task_el.classList.add('task', 'my-3');

                const task_content_el = document.createElement('div');
                task_content_el.classList.add('content', 'center');
                task_content_el.style.margin = 'auto';

                task_content_el.innerText = task;
                task_el.appendChild(task_content_el);
                li_ele.appendChild(task_el);
                taskName.value = '';

                const task_delete_el = document.createElement('button');
                task_delete_el.classList.add('mx-2', 'btn-danger', 'btn-delete');
                task_delete_el.textContent = 'Delete';
                task_content_el.appendChild(task_delete_el);
                task_delete_el.addEventListener('click', () => {
                    li_ele.removeChild(task_el);
                })
            })
            .catch(error => {
                console.error(error);
            });
    })
})