// Get the HTML elements
const taskForm = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");

const pendingList = document.getElementById("pending-list");
const completedList = document.getElementById("completed-list");

const pendingCount = document.getElementById("pending-count");
const completedCount = document.getElementById("completed-count");

const pendingEmptyMessage = document.getElementById("pending-empty-message");
const completedEmptyMessage = document.getElementById("completed-empty-message");

// Load saved tasks from Local Storage
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Save tasks to Local Storage
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Display tasks on the page
function renderTasks() {
    // Clear both lists before displaying tasks again
    pendingList.innerHTML = "";
    completedList.innerHTML = "";

    // Display every task
    tasks.forEach(function (task, index) {
        const listItem = document.createElement("li");
        listItem.classList.add("task-item");

        // Create task text
        const taskName = document.createElement("span");
        taskName.classList.add("task-text");
        taskName.textContent = task.text;

        // Create the buttons container
        const actions = document.createElement("div");
        actions.classList.add("task-actions");

        // Create Edit button
        const editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.classList.add("edit-button");
        editButton.type = "button";

        editButton.addEventListener("click", function () {
            const updatedText = prompt("Edit your task:", task.text);

            if (updatedText === null) {
                return;
            }

            const trimmedText = updatedText.trim();

            if (trimmedText === "") {
                alert("Task name cannot be empty!");
                return;
            }

            task.text = trimmedText;

            saveTasks();
            renderTasks();
        });

        // Create Delete button
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.classList.add("delete-button");
        deleteButton.type = "button";

        deleteButton.addEventListener("click", function () {
            tasks.splice(index, 1);

            saveTasks();
            renderTasks();
        });

        // Create Complete or Undo button
        const statusButton = document.createElement("button");
        statusButton.type = "button";

        if (task.completed) {
            listItem.classList.add("completed-task");

            statusButton.textContent = "Undo";
            statusButton.classList.add("undo-button");
        } else {
            statusButton.textContent = "Complete";
            statusButton.classList.add("complete-button");
        }

        statusButton.addEventListener("click", function () {
            task.completed = !task.completed;

            saveTasks();
            renderTasks();
        });

        // Add buttons to the actions container
        actions.appendChild(statusButton);
        actions.appendChild(editButton);
        actions.appendChild(deleteButton);

        // Add task text and actions to the list item
        listItem.appendChild(taskName);
        listItem.appendChild(actions);

        // Put the task in the correct list
        if (task.completed) {
            completedList.appendChild(listItem);
        } else {
            pendingList.appendChild(listItem);
        }
    });

    // Update task counts
    pendingCount.textContent = tasks.filter(function (task) {
        return !task.completed;
    }).length;

    completedCount.textContent = tasks.filter(function (task) {
        return task.completed;
    }).length;

    // Show or hide empty-list messages
    pendingEmptyMessage.style.display =
        pendingList.children.length === 0 ? "block" : "none";

    completedEmptyMessage.style.display =
        completedList.children.length === 0 ? "block" : "none";
}

// Add a new task
taskForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Please enter a task!");
        return;
    }

    // Create and store the new task
    const newTask = {
        text: taskText,
        completed: false
    };

    tasks.push(newTask);

    saveTasks();
    renderTasks();

    // Clear the input field
    taskInput.value = "";
});

// Display saved tasks when the page opens
renderTasks();