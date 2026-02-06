import express from "express";

const app = express();
app.use(express.json());

// Root
app.get("/", (req, res) => {
  res.status(200).send("Server is running!");
});

// TEMP: accept ANY method on /npc-chat so POST can't 404
app.all(["/npc-chat", "/npc-chat/"], (req, res) => {
  const body = req.body || {};
  const userText = (body.userText ?? "").toString();

  res.status(200).json({
    ok: true,
    method: req.method,
    path: req.path,
    userText,
    reply: "NPC heard: " + userText
  });
});

// Catch-all
app.all("*", (req, res) => {
  res.status(404).send(`Not found: ${req.method} ${req.path}`);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, "0.0.0.0", () => {
  console.log("Listening on port " + PORT);
});


