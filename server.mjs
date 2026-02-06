import express from "express";

const app = express();
app.use(express.json());

// Log every request so we can debug what Render is actually receiving
app.use((req, res, next) => {
  console.log("REQ:", req.method, req.url);
  next();
});

app.get("/", (req, res) => {
  res.status(200).send("Server is running!");
});

// GET for browser testing
app.get(["/npc-chat", "/npc-chat/"], (req, res) => {
  res.status(200).send("npc-chat route is live. Try POST with JSON {userText}");
});

// POST endpoint (this is what Roblox/PowerShell uses)
app.post(["/npc-chat", "/npc-chat/"], (req, res) => {
  const userText = (req.body?.userText ?? "").toString();
  res.status(200).json({ reply: "NPC heard: " + userText });
});

// Catch-all so 404 responses are informative
app.all("*", (req, res) => {
  res.status(404).send(`Not found: ${req.method} ${req.path}`);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, "0.0.0.0", () => {
  console.log("Listening on port " + PORT);
});
