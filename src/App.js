import React, { useState } from "react";
import TodoList from "./TodoList";
import "./App.css";
import Modal from "./Modal";

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskText, setTaskText] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false); // track the modal
  const [editingTask, setEditingTask] = useState(null); // track the task being edited
  const [dialogValue, setDialogValue] = useState(""); // track the input value
  const [filter, setFilter] = useState("All"); // track the filter value

  const handleAddTask = () => {
    if (taskText.trim()) {
      setTasks([
        ...tasks,
        { id: Date.now(), text: taskText, completed: false },
      ]);
      setTaskText("");
    }
  };

  const handleInputChange = (e) => {
    setTaskText(e.target.value);
  };

  // open modal for editing task text
  const handleEditTask = (task) => {
    setEditingTask(task);
    setDialogValue(task.text);
    setModalIsOpen(true);
  };

  // save new task text from modal input
  const handleSubmitEdit = () => {
    const updatedTasks = tasks.map((task) =>
      task.id === editingTask.id ? { ...task, text: dialogValue } : task
    );
    setTasks(updatedTasks);
    setModalIsOpen(false);
  };

  // cancel editing task, restore original text
  const handleCancelEdit = () => {
    setEditingTask(null);
    setDialogValue("");
    setModalIsOpen(false);
  };

  // Filter tasks based on completion status
  const handleFilterChange = (e) => {
    setFilter(e.target.value); // Update the selected filter
  };

  return (
    <div className="container">
      <Modal
        open={modalIsOpen}
        onSubmitEdit={handleSubmitEdit}
        onCancelEdit={handleCancelEdit}
        dialogValue={dialogValue}
        setDialogValue={setDialogValue}
      ></Modal>
      <h1>To-do List</h1>
      <input
        type="text"
        placeholder="Enter a new task"
        value={taskText}
        onChange={handleInputChange}
      />
      <button onClick={handleAddTask}>Add Task</button>
      <br />
      <br />
      <div>
        <label htmlFor="filterSelect">View:</label>
        <select id="filterSelect" value={filter} onChange={handleFilterChange}>
          <option value="All">All</option>
          <option value="Completed">Completed</option>
          <option value="Incomplete">Incomplete</option>
        </select>
      </div>

      <TodoList
        tasks={tasks}
        setTasks={setTasks}
        handleEditTask={handleEditTask}
        filter={filter}
      />
    </div>
  );
}

export default App;
