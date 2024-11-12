// api/tasks.js
export default async function handler(req, res) {
  if (req.method === "GET") {
    // Fetch tasks (for simplicity, this example uses a static array)
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    res.status(200).json(tasks);
  } else if (req.method === "POST") {
    const { taskText } = req.body;
    if (!taskText) {
      return res.status(400).json({ message: "Task text is required" });
    }
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push({ id: Date.now(), text: taskText, completed: false });
    localStorage.setItem("tasks", JSON.stringify(tasks));
    res.status(201).json({ message: "Task added successfully" });
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
