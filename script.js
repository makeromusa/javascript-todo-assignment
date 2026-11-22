// DOM elements
const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const errorMessage = document.getElementById("errorMessage");
const taskCounter = document.getElementById("taskCounter");
const clearAllBtn = document.getElementById("clearAllBtn");
const emptyMessage = document.getElementById("emptyMessage");

// Bonus: Load saved tasks from localStorage
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Bonus: Update task counter and empty state message
function updateUI() {
    taskCounter.textContent = tasks.length + (tasks.length === 1 ? " task" : " tasks");
    emptyMessage.style.display = tasks.length === 0 ? "block" : "none";
}

// Task B: Display tasks in the list
function renderTasks() {
    taskList.innerHTML = "";

    tasks.forEach(function (task, index) {
        const li = document.createElement("li");
        li.className = "task-item";
        if (task.completed) {
            li.classList.add("completed");
        }

        const leftDiv = document.createElement("div");
        leftDiv.className = "task-left";

        // Task C: Checkbox to mark task as completed
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.className = "task-checkbox";
        checkbox.checked = task.completed;

        checkbox.addEventListener("change", function () {
            tasks[index].completed = checkbox.checked;
            li.classList.toggle("completed", checkbox.checked);
            saveTasks();
        });

        const taskSpan = document.createElement("span");
        taskSpan.className = "task-text";
        taskSpan.textContent = task.text;

        leftDiv.appendChild(checkbox);
        leftDiv.appendChild(taskSpan);

        // Task D: Delete button to remove task
        const deleteBtn = document.createElement("button");
        deleteBtn.className = "delete-btn";
        deleteBtn.textContent = "Delete";

        deleteBtn.addEventListener("click", function () {
            tasks.splice(index, 1);
            saveTasks();
            renderTasks();
        });

        li.appendChild(leftDiv);
        li.appendChild(deleteBtn);
        taskList.appendChild(li);
    });

    updateUI();
}

// Task A & E: Add task with input validation
function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText === "") {
        errorMessage.textContent = "Please enter a task before adding!";
        return;
    }

    errorMessage.textContent = "";

    tasks.push({
        text: taskText,
        completed: false
    });

    saveTasks();
    renderTasks();

    taskInput.value = "";
    taskInput.focus();
}

addTaskBtn.addEventListener("click", addTask);

taskInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        addTask();
    }
});

taskInput.addEventListener("input", function () {
    if (errorMessage.textContent !== "") {
        errorMessage.textContent = "";
    }
});

// Bonus: Clear all tasks button
clearAllBtn.addEventListener("click", function () {
    if (tasks.length === 0) return;

    if (confirm("Are you sure you want to clear all tasks?")) {
        tasks = [];
        saveTasks();
        renderTasks();
    }
});

// Initial render
renderTasks();
