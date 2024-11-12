// app.js

// Function to render tasks
function renderTasks(tasks) {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = ""; // Clear current list

  tasks.forEach((task) => {
    const listItem = document.createElement("li");
    listItem.textContent = task.text;

    // Attempting to add the "completed" class if task is completed
    if (task.completed) {
      listItem.classList.add("completed"); // Make sure "completed" is defined and not empty
    }

    // Complete Task Button
    const completeButton = document.createElement("button");
    completeButton.textContent = task.completed ? "Undo" : "Complete";
    completeButton.addEventListener("click", () => toggleTask(task.id));

    // Delete Task Button
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => deleteTask(task.id));

    listItem.appendChild(completeButton);
    listItem.appendChild(deleteButton);
    taskList.appendChild(listItem);
  });
}

// Task management functions
let tasks = []; // This will store tasks in-memory (for now)

function addTask(taskText) {
  if (!taskText) return; // Make sure taskText is not empty

  const newTask = { id: Date.now(), text: taskText, completed: false };
  tasks.push(newTask);
  renderTasks(tasks);
}

function toggleTask(id) {
  tasks = tasks.map((task) =>
    task.id === id ? { ...task, completed: !task.completed } : task
  );
  renderTasks(tasks);
}

function deleteTask(id) {
  tasks = tasks.filter((task) => task.id !== id);
  renderTasks(tasks);
}

// Event Listeners
document.getElementById("addTaskButton").addEventListener("click", () => {
  const taskText = document.getElementById("taskInput").value;
  if (taskText) {
    addTask(taskText);
    document.getElementById("taskInput").value = ""; // Clear input
  }
});

// Initial render
renderTasks(tasks);
