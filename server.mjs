import express from "express";

const app = express();
app.use(express.json());

// Root
app.get("/", (req, res) => {
  res.send("Server is running!");
});

// Browser test
app.get(["/npc-chat", "/npc-chat/"], (req, res) => {
  res.status(200).send("npc-chat route is live (POST to chat)");
});

// REAL endpoint (POST)
app.post(["/npc-chat", "/npc-chat/"], (req, res) => {
  const userText = (req.body?.userText ?? "").toString();
  res.status(200).json({ reply: "NPC heard: " + userText });
});

// Helpful debug: show unmatched routes
app.all("*", (req, res) => {
  res.status(404).send(`Not found: ${req.method} ${req.path}`);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, "0.0.0.0", () => {
  console.log("Listening on port " + PORT);
});
