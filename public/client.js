window.addEventListener('load', () => {
    const form = document.querySelector('#task-main');
    const taskName = document.querySelector('#task-name');
    const li_ele = document.querySelector('.tasks');
    console.log(form);

    form.addEventListener('submit', (e) => {
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

        const task_delete_el = document.createElement('button');
        task_delete_el.classList.add('mx-2', 'btn-danger', 'btn-delete');
        task_delete_el.textContent = 'Delete';
        task_content_el.appendChild(task_delete_el);
        task_delete_el.addEventListener('click', () => {
            li_ele.removeChild(task_el);
        })
    })
})


// Backup code:
// const taskForm = document.getElementById('task-main');

// taskForm.addEventListener('submit', (event) => {
//     event.preventDefault();
//     const taskName = document.getElementById('task-name').value;
//     const taskDesc = document.getElementById('task-description').value;
//     const task = {
//         title: taskName,
//         desc: taskDesc,
//     };

//     const taskContainer = document.querySelector('.tasks');
//     taskContainer.innerHTML += `
//     <ul class="task my-2">
//         <li>${task.title} - ${task.desc} 
//         <button class="btn btn-light text-center">Delete</button>
//         </li>
//     </ul>
//     `;
// })