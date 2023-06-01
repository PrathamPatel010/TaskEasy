const taskForm = document.getElementById('task-main');

taskForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const taskName = document.getElementById('task-name').value;
    const taskDesc = document.getElementById('task-description').value;
    const task = {
        title: taskName,
        desc: taskDesc,
    };

    const taskContainer = document.querySelector('.tasks');
    taskContainer.innerHTML += `
    <ul class="task my-2">
        <li>${task.title} - ${task.desc} 
        <button class="btn btn-light text-center">Delete</button>
        </li>
    </ul>
    `;
})