// Wait for the DOM to fully load
document.addEventListener('DOMContentLoaded', () => {
    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');
    const dateElement = document.getElementById('date'); // Date element

    // Flag to track if tasks have changed
    let isDirty = false;

    // Function to display today's date
    function displayDate() {
        const today = new Date();
        const options = { weekday: 'long', month: 'long', day: 'numeric' };
        dateElement.textContent = today.toLocaleDateString('en-US', options);
    }

    // Load tasks from Local Storage
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskData => addTask(taskData.text, false, taskData.completed));
    }

    // Save tasks to Local Storage
    function saveTasks() {
        const tasks = Array.from(taskList.querySelectorAll('li')).map(li => {
            return {
                text: li.querySelector('.task-text').textContent,
                completed: li.classList.contains('completed'),
            };
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Function to add a task to the list
    function addTask(taskText, save = true, completed = false) {
        if (!taskText) {
            taskText = taskInput.value.trim(); // Get input value if not provided
            if (taskText === "") {
                alert("Please enter a task.");
                return;
            }
        }

        // Create a new list item
        const listItem = document.createElement('li');

        // Create a span to hold the task text
        const taskTextSpan = document.createElement('span');
        taskTextSpan.classList.add('task-text');
        taskTextSpan.textContent = taskText;

        // Mark task as completed if applicable
        if (completed) {
            listItem.classList.add('completed');
        }

        // Add an event listener to toggle 'completed' class on click
        taskTextSpan.addEventListener('click', function () {
            listItem.classList.toggle('completed');
            isDirty = true; // Mark as changed
        });

        // Create a remove button for the task
        const removeButton = document.createElement('button');
        removeButton.textContent = "Remove";
        removeButton.classList.add('remove-btn');

        // Add an event listener to the remove button
        removeButton.addEventListener('click', () => {
            taskList.removeChild(listItem);
            isDirty = true; // Mark as changed
            saveTasks(); // Save after removal
        });

        // Append the task text span and remove button to the list item
        listItem.appendChild(taskTextSpan);
        listItem.appendChild(removeButton);

        // Append the list item to the task list
        taskList.appendChild(listItem);

        // Clear the input field
        taskInput.value = "";

        // Save the task to Local Storage if required
        if (save) {
            saveTasks();
        }
    }

    // Add click event listener to the add button
    addButton.addEventListener('click', () => addTask());

    // Add keypress event listener to the input field
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    // Periodically save tasks when changes are detected
    setInterval(() => {
        if (isDirty) {
            saveTasks();
            isDirty = false;
        }
    }, 1000);

    // Display today's date
    displayDate();

    // Load tasks when the page is loaded
    loadTasks();
});
