// Wait for the DOM to fully load
document.addEventListener('DOMContentLoaded', () => {
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');
    const dateElement = document.getElementById('date');

    let isDirty = false;

    function displayDate() {
        const today = new Date();
        const options = { weekday: 'long', month: 'long', day: 'numeric' };
        dateElement.textContent = today.toLocaleDateString('en-US', options);
    }

    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskData => addTask(taskData.text, false, taskData.completed));
    }

    function saveTasks() {
        const tasks = Array.from(taskList.querySelectorAll('li')).map(li => {
            return {
                text: li.querySelector('.task-text').textContent,
                completed: li.classList.contains('completed'),
            };
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function addTask(taskText, save = true, completed = false) {
        if (!taskText) {
            taskText = taskInput.value.trim();
            if (taskText === "") {
                alert("Please enter a task.");
                return;
            }
        }

        const listItem = document.createElement('li');
        if (completed) {
            listItem.classList.add('completed');
        }

        const checkmarkIcon = document.createElement('span');
        checkmarkIcon.classList.add('checkmark-icon');
        checkmarkIcon.innerHTML = '&#x2714;';

        const taskTextSpan = document.createElement('span');
        taskTextSpan.classList.add('task-text');
        taskTextSpan.textContent = taskText;

        taskTextSpan.addEventListener('click', function () {
            listItem.classList.toggle('completed');
            isDirty = true;
            saveTasks();
        });

        const removeButton = document.createElement('button');
        removeButton.textContent = "Remove";
        removeButton.classList.add('remove-btn');

        removeButton.addEventListener('click', () => {
            taskList.removeChild(listItem);
            isDirty = true;
            saveTasks();
        });

        listItem.appendChild(checkmarkIcon);
        listItem.appendChild(taskTextSpan);
        listItem.appendChild(removeButton);
        taskList.appendChild(listItem);

        taskInput.value = "";

        if (save) {
            saveTasks();
        }
    }

    addButton.addEventListener('click', () => addTask());

    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    displayDate();
    loadTasks();
});
