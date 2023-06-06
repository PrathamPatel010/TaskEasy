window.addEventListener('load', async() => {
    let logoutBtn;
    let acknowledge;
    let emailInfo;
    const heading = document.getElementById('pageHeading');
    await axios
        .get('/user', { withCredentials: true })
        .then((response) => {
            acknowledge = document.createElement('div');
            acknowledge.classList.add('my-3');
            emailInfo = response.data.email;
            if (!emailInfo) {
                acknowledge.innerHTML = `<h6>Not Logged in</h6>`;
                heading.appendChild(acknowledge);
            } else {
                acknowledge.innerHTML = `
            <h6>Logged in as ${response.data.email}</h6>`;
                heading.appendChild(acknowledge);
                logoutBtn = document.createElement('btn');
                logoutBtn.innerText = 'Log Out';
                logoutBtn.classList.add('btn', 'btn-success', 'text-center', 'my-2');
                acknowledge.appendChild(logoutBtn);
            }
        })
        .catch((err) => {
            console.log(err);
        });
    setInterval(() => {
        if (!emailInfo) {
            window.location.href = '/';
        }
    }, 1000)
    logoutBtn.addEventListener('click', async() => {
        await axios
            .post('/logout', {}, { withCredentials: true })
            .then(() => {
                acknowledge.innerHTML = `<h6>Not Logged in</h6>`;
                setTimeout(() => {
                    window.location.href = '/';
                }, 2000);
            })
            .catch((err) => {
                console.log(err);
            });
    });

    const form = document.querySelector('#form-task');
    const taskList = document.getElementById('task-list');

    await axios.get('/todos', { withCredentials: true })
        .then((response) => {
            response.data.forEach((task) => {
                const taskItem = document.createElement('li');
                taskItem.style.listStyle = 'disc';
                taskItem.classList.add('my-3');
                taskItem.innerHTML = `
            <label class="task-label" style="display:inline;">${task.text}</label>
            <button class="btn-delete">Delete</button>
          `;
                taskList.appendChild(taskItem);
            });
        })
        .catch((err) => {
            console.log(err);
        });

    form.addEventListener('submit', async(e) => {
        e.preventDefault();
        const taskName = document.getElementById('task-name');
        const todo = {
            task: taskName.value,
        };
        await axios
            .post('/todos', todo, { withCredentials: true })
            .then((response) => {
                const taskItem = document.createElement('li');
                taskItem.style.listStyle = 'disc';
                taskItem.classList.add('my-3');
                taskItem.innerHTML = `
            <label class="task-label" style="display:inline;">${response.data.text}</label>
            <button class="btn-delete">Delete</button>
          `;
                taskList.appendChild(taskItem);
                document.getElementById('task-name').value = '';
            })
            .catch((err) => {
                console.log(err);
            });
    });

    taskList.addEventListener('click', async(e) => {
        e.preventDefault();
        if (e.target.classList.contains('btn-delete')) {
            try {
                const taskItem = e.target.closest('li');
                const taskText = document.querySelector('.task-label').textContent;
                await axios.delete(`/todos?text=${encodeURIComponent(taskText)}`, { withCredentials: true });
                taskList.removeChild(taskItem);
            } catch (err) {
                console.log(err);
            }
        }
    });
});