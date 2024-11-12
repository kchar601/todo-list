// api/tasks.js
export default async function handler(req, res) {
  if (req.method === "GET") {
    // Fetch tasks logic (for example, returning an empty array for now)
    res.status(200).json([]);
  } else if (req.method === "POST") {
    const { taskText } = req.body;
    if (!taskText) {
      return res.status(400).json({ message: "Task text is required" });
    }
    // Logic for adding a task
    res.status(201).json({ message: "Task added successfully" });
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
