import React from "react";
import {
  render,
  screen,
  fireEvent,
  cleanup,
  within,
} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import App from "./App";

// Setup and teardown for portal container
beforeAll(() => {
  const modalRoot = document.createElement("div");
  modalRoot.setAttribute("id", "modal-root");
  document.body.appendChild(modalRoot);
});

afterAll(() => {
  const modalRoot = document.getElementById("modal-root");
  if (modalRoot) {
    document.body.removeChild(modalRoot);
  }
});

afterEach(() => {
  cleanup();
});

describe("To-do List App", () => {
  test("renders the header and input elements", () => {
    render(<App />);
    expect(screen.getByText(/To-do List/i)).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/Enter a new task/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/Add Task/i)).toBeInTheDocument();
  });

  test("allows users to add a new task", () => {
    render(<App />);
    const input = screen.getByPlaceholderText(/Enter a new task/i);
    const addButton = screen.getByText(/Add Task/i);

    fireEvent.change(input, { target: { value: "New Task" } });
    fireEvent.click(addButton);

    expect(screen.getByText(/New Task/i)).toBeInTheDocument();
  });

  test("toggles task completion status", () => {
    render(<App />);
    const input = screen.getByPlaceholderText(/Enter a new task/i);
    const addButton = screen.getByText(/Add Task/i);

    // Add a new task
    fireEvent.change(input, { target: { value: "Complete Task" } });
    fireEvent.click(addButton);

    // Locate the specific list item for the added task
    const taskItem = screen.getByText(/Complete Task/i).closest("li");
    expect(taskItem).toBeInTheDocument();

    // Select the button within this specific list item by role (button) and its first instance
    const completeButton = within(taskItem).getByRole("button", {
      name: /Complete/i,
    });

    // Toggle completion
    fireEvent.click(completeButton);

    // Verify that the task has the line-through style
    expect(taskItem).toHaveClass("completed");
  });
});

describe("To-do List Additional Features (Candidate Implementation)", () => {
  test("allows users to delete a task", () => {
    render(<App />);
    const input = screen.getByPlaceholderText(/Enter a new task/i);
    const addButton = screen.getByText(/Add Task/i);

    // Add a new task
    fireEvent.change(input, { target: { value: "Task to delete" } });
    fireEvent.click(addButton);

    // Locate the specific list item for the added task
    const taskItem = screen.getByText(/Task to delete/i).closest("li");
    expect(taskItem).toBeInTheDocument();

    // Select the button within this specific list item by role (button) and its first instance
    const deleteButton = within(taskItem).getByRole("button", {
      name: /Delete/i,
    });

    // Toggle Delete
    fireEvent.click(deleteButton);

    // Verify that the task has been removed from the DOM
    expect(taskItem).not.toBeInTheDocument();
  });

  test("allows users to edit a task", () => {
    render(<App />);

    const input = screen.getByPlaceholderText(/Enter a new task/i);
    const addButton = screen.getByText(/Add Task/i);

    // Add a new task
    fireEvent.change(input, { target: { value: "Task to update" } });
    fireEvent.click(addButton);

    // Locate the specific list item for the added task
    const taskItem = screen.getByText(/Task to update/i).closest("li");
    expect(taskItem).toBeInTheDocument();

    // Select the edit button for the task
    const editButton = within(taskItem).getByRole("button", { name: /Edit/i });
    fireEvent.click(editButton);

    // Assert the modal is visible
    expect(screen.getByText(/Edit Task:/i)).toBeInTheDocument();

    // Cancel functionality
    let modalInput = screen.getByLabelText(/Edit Task:/i);
    fireEvent.change(modalInput, { target: { value: "Cancel Test" } });
    fireEvent.click(screen.getByText(/Cancel/i));

    // Verify the modal is closed and the task text is unchanged
    expect(screen.queryByText(/Edit Task:/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Cancel Test/i)).not.toBeInTheDocument();
    expect(screen.getByText(/Task to update/i)).toBeInTheDocument();

    // Reopen the modal for updating functionality
    fireEvent.click(editButton);
    expect(screen.getByText(/Edit Task:/i)).toBeInTheDocument();

    // Refresh modalInput reference
    modalInput = screen.getByLabelText(/Edit Task:/i);

    // Save functionality
    fireEvent.change(modalInput, { target: { value: "Updated text" } });
    fireEvent.click(screen.getByText(/Save/i));

    // Verify the modal is closed and the task text is updated
    expect(screen.queryByText(/Edit Task:/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Task to update/i)).not.toBeInTheDocument();
    expect(screen.getByText(/Updated text/i)).toBeInTheDocument();
  });

  test("filters tasks by completed and incomplete", () => {
    render(<App />);

    const input = screen.getByPlaceholderText(/Enter a new task/i);
    const addButton = screen.getByText(/Add Task/i);

    // Add a 2 new tasks
    fireEvent.change(input, { target: { value: "Complete Task" } });
    fireEvent.click(addButton);
    fireEvent.change(input, { target: { value: "Task that is incomplete" } });
    fireEvent.click(addButton);

    // Locate the specific list item for the added task
    const completeTaskItem = screen.getByText(/Complete Task/i).closest("li");
    expect(completeTaskItem).toBeInTheDocument();

    // Select the button within this specific list item by role (button) and its first instance
    const completeButton = within(completeTaskItem).getByRole("button", {
      name: /Complete/i,
    });

    // Toggle completion
    fireEvent.click(completeButton);

    // Change the select filter to show only complete
    const filterView = screen.getByLabelText(/View:/i);
    fireEvent.change(filterView, { target: { value: "Completed" } });
    expect(screen.getByText(/Complete Task/i)).toBeInTheDocument();
    expect(
      screen.queryByText(/Task that is incomplete/i)
    ).not.toBeInTheDocument();

    // Change the select filter to show only incomplete
    fireEvent.change(filterView, { target: { value: "Incomplete" } });
    expect(screen.getByText(/Task that is incomplete/i)).toBeInTheDocument();
    expect(screen.queryByText(/Complete Task/i)).not.toBeInTheDocument();

    // Reset back to all and check both
    fireEvent.change(filterView, { target: { value: "All" } });
    expect(screen.getByText(/Complete Task/i)).toBeInTheDocument();
    expect(screen.getByText(/Task that is incomplete/i)).toBeInTheDocument();
  });
});
