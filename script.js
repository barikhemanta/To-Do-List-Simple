const taskInput = document.getElementById("taskInput");
const addButton = document.getElementById("addButton");
const taskList = document.getElementById("taskList");

let tasks = [];

addButton.addEventListener("click", addTask);

function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText !== "") {
    const task = {
      text: taskText,
      completed: false,
      dueDate: null, // Default due date
    };
    tasks.push(task);
    saveTasks();
    renderTasks();
    taskInput.value = "";
  }
}

function renderTasks() {
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
            <input type="checkbox" class="completedCheckbox" ${
              task.completed ? "checked" : ""
            }>
            <span class="taskText ${task.completed ? "completed" : ""}">${
      task.text
    }</span>
            <span class="due-date">${task.dueDate ? task.dueDate : ""}</span>
            <button class="editButton">Edit</button>
            <button class="deleteButton">Delete</button>
        `;
    taskList.appendChild(li);

    const completedCheckbox = li.querySelector(".completedCheckbox");
    const taskText = li.querySelector(".taskText");
    const editButton = li.querySelector(".editButton");
    const deleteButton = li.querySelector(".deleteButton");

    completedCheckbox.addEventListener("change", () => {
      task.completed = completedCheckbox.checked;
      saveTasks();
      renderTasks();
    });

    // ...

    editButton.addEventListener("click", () => {
      taskText.click();
    });

    deleteButton.addEventListener("click", () => {
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
    });
  });
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Load tasks from local storage on page load
tasks = JSON.parse(localStorage.getItem("tasks")) || [];
renderTasks();
