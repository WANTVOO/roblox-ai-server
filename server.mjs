import express from "express";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("Server is running!");
});

// ✅ GET chat (easy to test in a browser)
// Example: /npc-chat-get?userText=hello
app.get("/npc-chat-get", (req, res) => {
  const userText = (req.query.userText ?? "").toString();
  res.status(200).json({
    ok: true,
    method: "GET",
    userText,
    reply: "NPC heard: " + userText
  });
});

// ✅ POST chat (Roblox can still use this later)
app.post(["/npc-chat", "/npc-chat/"], (req, res) => {
  const userText = (req.body?.userText ?? "").toString();
  res.status(200).json({ reply: "NPC heard: " + userText });
});

// Catch-all
app.all("*", (req, res) => {
  res.status(404).send(`Not found: ${req.method} ${req.path}`);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, "0.0.0.0", () => console.log("Listening on port " + PORT));



