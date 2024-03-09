const form = document.getElementById('addTaskForm');
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const taskText = taskInput.value.trim();

    if (taskText) {
        const newTask = {
            text: taskText,
            completed: false,
        };

        tasks.push(newTask);
        localStorage.setItem('tasks', JSON.stringify(tasks));

        displayTask(newTask);

        taskInput.value = '';
    }
});

const displayTask = (task) => {
    const li = document.createElement('li');
    li.dataset.key = tasks.indexOf(task);
    li.classList.add('list');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.classList.add('cbx');
    checkbox.checked = task.completed;
    checkbox.addEventListener('change', () => {
        task.completed = checkbox.checked;
        localStorage.setItem('tasks', JSON.stringify(tasks));
    });

    const span = document.createElement('span');
    span.classList.add('task-text');
    span.textContent = task.text;

    const editButton = document.createElement('button');
    editButton.textContent = 'Editar';
    editButton.classList.add('editButton');
    editButton.addEventListener('click', () => {
        const input = document.createElement('input');
        input.type = 'text';
        input.value = task.text;
        input.addEventListener('blur', () => {
            task.text = input.value.trim();
            localStorage.setItem('tasks', JSON.stringify(tasks));
            displayTask(task);
        });
        li.replaceChild(input, span);
    });

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'X';
    deleteButton.classList.add('deleteButton');
    deleteButton.addEventListener('click', () => {
        const index = li.dataset.key;
        tasks.splice(index, 1);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        li.remove();
    });

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(editButton);
    li.appendChild(deleteButton);
    taskList.appendChild(li);
};

for (const task of tasks) {
    displayTask(task);
}

// const form = document.getElementById('addTaskForm');
// const taskInput = document.getElementById('taskInput');
// const taskList = document.getElementById('taskList');

// let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// form.addEventListener('submit', (event) => {
//     event.preventDefault();

//     const taskText = taskInput.value.trim();

//     if (taskText) {
//         const newTask = {
//             text: taskText,
//             completed: false,
//         };

//         tasks.push(newTask);
//         localStorage.setItem('tasks', JSON.stringify(tasks));

//         displayTask(newTask);

//         taskInput.value = '';
//     }
// });

// const displayTask = (task) => {
//     const li = document.createElement('li');
//     li.dataset.key = tasks.indexOf(task);

//     const checkbox = document.createElement('input');
//     checkbox.type = 'checkbox';
//     checkbox.checked = task.completed;
//     checkbox.addEventListener('change', () => {
//         task.completed = checkbox.checked;
//         localStorage.setItem('tasks', JSON.stringify(tasks));
//     });

//     const label = document.createElement('label');
//     label.textContent = task.text;

//     const editButton = document.createElement('button');
//     editButton.textContent = 'Editar';
//     editButton.addEventListener('click', () => {
//         const input = document.createElement('input');
//         input.type = 'text';
//         input.value = task.text;
//         input.addEventListener('blur', () => {
//             task.text = input.value.trim();
//             localStorage.setItem('tasks', JSON.stringify(tasks));
//             displayTask(task);
//         });
//         li.replaceChild(input, label);
//     });

//     const deleteButton = document.createElement('button');
//     deleteButton.textContent = 'X';
//     deleteButton.addEventListener('click', () => {
//         const index = li.dataset.key;
//         tasks.splice(index, 1);
//         localStorage.setItem('tasks', JSON.stringify(tasks));
//         li.remove();
//     });

//     li.appendChild(checkbox);
//     li.appendChild(label);
//     li.appendChild(editButton);
//     li.appendChild(deleteButton);
//     taskList.appendChild(li);
// };

// for (const task of tasks) {
//     displayTask(task);
// }
