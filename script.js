// Wait for the DOM to fully load
document.addEventListener('DOMContentLoaded', () => {
    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load tasks from Local Storage
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => addTask(taskText, false)); // Add each stored task without saving again
    }

    // Save tasks to Local Storage
    function saveTasks() {
        const tasks = Array.from(taskList.querySelectorAll('li span')).map(span => span.textContent);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Function to add a task to the list
    function addTask(taskText, save = true) {
        if (!taskText) {
            taskText = taskInput.value.trim(); // Get input value if not provided
            if (taskText === "") {
                alert("Please enter a task.");
                return;
            }
        }

        // Create a new list item
        const listItem = document.createElement('li');
        listItem.className = 'task-item'; // Optional class for styling

        // Create a span to hold the task text
        const taskTextSpan = document.createElement('span');
        taskTextSpan.textContent = taskText;

        // Create a remove button for the task
        const removeButton = document.createElement('button');
        removeButton.textContent = "Remove";
        removeButton.className = 'remove-btn';

        // Add an event listener to the remove button
        removeButton.addEventListener('click', () => {
            taskList.removeChild(listItem);
            saveTasks(); // Update Local Storage after removing
        });

        // Append the task text span and remove button to the list item
        listItem.appendChild(taskTextSpan);
        listItem.appendChild(removeButton);

        // Append the list item to the task list
        taskList.appendChild(listItem);

        // Clear the input field
        taskInput.value = "";

        // Save the task to Local Storage if required
        if (save) saveTasks();
    }

    // Add click event listener to the add button
    addButton.addEventListener('click', () => addTask());

    // Add keypress event listener to the input field
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    // Load tasks when the page is loaded
    loadTasks();
});
