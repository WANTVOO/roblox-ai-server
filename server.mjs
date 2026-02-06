import express from "express";

const app = express();
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("Server is running!");
});

// NPC chat route
app.post("/npc-chat", (req, res) => {
  const { userText } = req.body;
  res.json({
    reply: "NPC heard: " + (userText ?? "")
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Listening on port " + PORT);
});

