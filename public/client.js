window.addEventListener('load', () => {
    const form = document.querySelector('#task-main');
    const taskName = document.querySelector('#task-name');
    const li_ele = document.querySelector('.tasks');
    console.log(form);

    form.addEventListener('submit', async(e) => {
        e.preventDefault();
        const task = taskName.value;

        const task_el = document.createElement('div');
        task_el.classList.add('task', 'my-3');

        const task_content_el = document.createElement('div');
        task_content_el.classList.add('content', 'center');
        task_content_el.style.margin = 'auto';

        task_content_el.innerText = task;
        task_el.appendChild(task_content_el);
        li_ele.appendChild(task_el);
        taskName.value = '';

        await axios.post('/tasks', { taskname: task })
            .then(response => {
                console.log(response.data);
                // Perform any necessary UI updates or notifications

                // Make axios GET request to fetch the updated tasks from the database
                await axios.get('/tasks', { task })
                    .then(response => {
                        console.log(response.data);
                        // Perform any necessary UI updates with the fetched tasks
                    })
                    .catch(error => {
                        console.error(error);
                        // Handle the error scenario
                    });
            })
            .catch(error => {
                console.error(error);
                // Handle the error scenario
            });
        const task_delete_el = document.createElement('button');
        task_delete_el.classList.add('mx-2', 'btn-danger', 'btn-delete');
        task_delete_el.textContent = 'Delete';
        task_content_el.appendChild(task_delete_el);
        task_delete_el.addEventListener('click', () => {
            li_ele.removeChild(task_el);
        })
    })
})