import React from "react";
import "./TodoList.css";

function TodoList({ tasks, setTasks, handleEditTask, filter }) {
  const toggleTaskCompletion = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const deleteTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  };

  //checks the filter and returns the appropriate tasks before rendering
  const filteredTasks = tasks.filter((task) => {
    if (filter === "All") return true;
    if (filter === "Completed") return task.completed;
    if (filter === "Incomplete") return !task.completed;
    return true;
  });

  return (
    <div>
      <ul>
        {filteredTasks.map((task) => (
          <li key={task.id} className={task.completed ? "completed" : ""}>
            <div className="task-text">{task.text}</div>
            <button
              className="complete-btn"
              onClick={() => toggleTaskCompletion(task.id)}
            >
              {task.completed ? "Undo" : "Complete"}
            </button>
            <button className="edit-btn" onClick={() => handleEditTask(task)}>
              Edit
            </button>
            <button className="delete-btn" onClick={() => deleteTask(task.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
