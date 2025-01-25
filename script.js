// Wait for the DOM to fully load
document.addEventListener('DOMContentLoaded', () => {
    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Function to add a task to the list
    function addTask() {
        // Get and trim the input value
        const taskText = taskInput.value.trim();

        // Debugging: Log the input value
        console.log("Task input value:", taskText);

        // Check if the input is empty
        if (taskText === "") {
            alert("Please enter a task.");
            return;
        }

        // Create a new list item
        const listItem = document.createElement('li');

        // Debugging: Check if list item is created
        console.log("List item created:", listItem);

        // Create a span to hold the task text
        const taskTextSpan = document.createElement('span');
        taskTextSpan.textContent = taskText;

        // Debugging: Check if span is created
        console.log("Task text span created:", taskTextSpan);

        // Create a remove button for the task
        const removeButton = document.createElement('button');
        removeButton.textContent = "Remove";
        removeButton.className = 'remove-btn';

        // Debugging: Check if button is created
        console.log("Remove button created:", removeButton);

        // Add an event listener to the remove button
        removeButton.addEventListener('click', () => {
            console.log("Remove button clicked for:", listItem);
            if (listItem.parentNode === taskList) {
                taskList.removeChild(listItem);
                console.log("Task removed from list:", listItem);
            } else {
                console.error("Task list mismatch during removal.");
            }
        });

        // Append the task text span and remove button to the list item
        listItem.appendChild(taskTextSpan);
        listItem.appendChild(removeButton);

        // Append the list item to the task list
        taskList.appendChild(listItem);

        // Debugging: Log the updated task list
        console.log("Task added to list:", listItem);

        // Clear the input field
        taskInput.value = "";

        // Debugging: Confirm input field is cleared
        console.log("Task input cleared.");
    }

    // Add click event listener to the add button
    addButton.addEventListener('click', addTask);

    // Add keypress event listener to the input field
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            console.log("Enter key pressed.");
            addTask();
        }
    });

    // Debugging: Confirm event listeners are attached
    console.log("Event listeners attached.");
});

