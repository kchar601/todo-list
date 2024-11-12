// Fetch tasks
async function fetchTasks() {
  try {
    const response = await fetch("/api/tasks");
    const tasks = await response.json();
    console.log(tasks);
    // Render tasks to the UI
  } catch (error) {
    console.error("Error fetching tasks:", error);
  }
}

// Add a new task
async function addNewTask(taskText) {
  try {
    const response = await fetch("/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ taskText }),
    });
    if (response.ok) {
      console.log("Task added successfully");
      fetchTasks(); // Re-fetch tasks to update UI
    } else {
      console.error("Error adding task");
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

// Example usage
fetchTasks();
document.getElementById("addTaskButton").addEventListener("click", () => {
  const taskText = document.getElementById("taskInput").value;
  if (taskText) addNewTask(taskText);
});
