// Get the HTML elements
const taskForm = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");

const pendingList = document.getElementById("pending-list");
const completedList = document.getElementById("completed-list");

const pendingCount = document.getElementById("pending-count");
const completedCount = document.getElementById("completed-count");

const pendingEmptyMessage = document.getElementById("pending-empty-message");
const completedEmptyMessage = document.getElementById("completed-empty-message");

const inputError = document.getElementById("input-error");



// Set an icon and label inside a button
function setButtonContent(button, iconClass, label) {
    const icon = document.createElement("i");
    icon.className = iconClass;
    icon.setAttribute("aria-hidden", "true");

    const text = document.createElement("span");
    text.textContent = label;

    button.replaceChildren(icon, text);
}




// Load saved tasks from Local Storage
let tasks = [];

try {
    tasks = JSON.parse(localStorage.getItem("tasks")) || [];
} catch (error) {
    console.error("Unable to load saved tasks:", error);
}


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

        // Create task details container
        const taskDetails = document.createElement("div");
        taskDetails.classList.add("task-details");

        // Create task text
        const taskName = document.createElement("span");
        taskName.classList.add("task-text");
        taskName.textContent = task.text;

        // Create timestamp
        const timestamp = document.createElement("small");
        timestamp.classList.add("task-timestamp");

        timestamp.textContent = "Added: " + (task.createdAt || "Date unavailable");

        // Display completion timestamp
        if (task.completed && task.completedAt) {
         timestamp.textContent += " | Completed: " + task.completedAt;
        }

        // Add task name and timestamp to the details container
        taskDetails.appendChild(taskName);
        taskDetails.appendChild(timestamp);

        // Create the buttons container
        const actions = document.createElement("div");
        actions.classList.add("task-actions");

        // Create Edit button
        const editButton = document.createElement("button");
        setButtonContent(editButton, "fa-solid fa-pen", "Edit");
        editButton.classList.add("edit-button");
        editButton.type = "button";

        // Create Delete button
        const deleteButton = document.createElement("button");
        setButtonContent(deleteButton, "fa-solid fa-trash", "Delete");
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

            setButtonContent(statusButton, "fa-solid fa-rotate-left", "Undo");
            statusButton.classList.add("undo-button");
        } else {
            setButtonContent(statusButton, "fa-solid fa-check", "Complete");
            statusButton.classList.add("complete-button");
        }

        statusButton.addEventListener("click", function () {
            task.completed = !task.completed;

            if (task.completed) {
                task.completedAt = new Date().toLocaleString();
            } else {
                task.completedAt = null;
            }

            saveTasks();
            renderTasks();
        });


    // Inline Edit functionality
    editButton.addEventListener("click", function () {

    // Create an input field
    const editInput = document.createElement("input");
    editInput.type = "text";
    editInput.value = task.text;
    editInput.classList.add("edit-input");

    // Clear validation message when the user starts typing
    editInput.addEventListener("input", function () {
        editInput.setCustomValidity("");
    });

    // Create Save button
    const saveButton = document.createElement("button");
    setButtonContent(saveButton, "fa-solid fa-floppy-disk", "Save");
    saveButton.classList.add("edit-button");
    saveButton.type = "button";

    // Create Cancel button
    const cancelButton = document.createElement("button");
    setButtonContent(cancelButton, "fa-solid fa-xmark", "Cancel");
    cancelButton.classList.add("undo-button");
    cancelButton.type = "button";


    // Replace task text with input field
    taskDetails.replaceChild(editInput, taskName);

    // Replace Edit button with Save button
    actions.replaceChild(saveButton, editButton);

    // Add Cancel button
    actions.appendChild(cancelButton);

    // Remove Complete and Delete buttons
    actions.removeChild(statusButton);
    actions.removeChild(deleteButton);

    editInput.focus();
    editInput.select();


    // Save edited task
    function saveEdit() {

        const updatedText = editInput.value.trim();

        if (updatedText === "") {
            editInput.setCustomValidity("Task name cannot be empty!");
            editInput.reportValidity();
            editInput.focus();
            return;
        }

        task.text = updatedText;

        saveTasks();
        renderTasks();
    }

    // Save button click
    saveButton.addEventListener("click", saveEdit);

    // Cancel button click
    cancelButton.addEventListener("click", function () {
        renderTasks();
    });

    // Keyboard shortcuts
    editInput.addEventListener("keydown", function (event) {

        if (event.key === "Enter") {
            saveEdit();
        }

        if (event.key === "Escape") {
            renderTasks();
        }

    });

});


        // Add buttons to the actions container
        actions.appendChild(statusButton);
        actions.appendChild(editButton);
        actions.appendChild(deleteButton);

        // Add task details and actions to the list item
        listItem.appendChild(taskDetails);
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
        inputError.textContent = "Please enter a task!";
        taskInput.focus();
        return;
    }

    inputError.textContent = "";

    // Create and store the new task
   const newTask = {
    text: taskText,
    completed: false,
    createdAt: new Date().toLocaleString(),
    completedAt: null
    };

    tasks.push(newTask);

    saveTasks();
    renderTasks();

    // Clear the input field and return focus
    taskInput.value = "";
    taskInput.focus();
});

taskInput.addEventListener("input", function () {
    inputError.textContent = "";
});

// Display saved tasks when the page opens
renderTasks();