import express from "express";

const app = express();
app.use(express.json());

// Root
app.get("/", (req, res) => {
  res.status(200).send("Server is running!");
});

/*
  ✅ ALIAS ROUTE (THIS IS THE IMPORTANT PART)
  This lets you test in a browser:
  /npc-chat?userText=hello
*/
app.get("/npc-chat", (req, res) => {
  const userText = (req.query.userText ?? "").toString();
  res.status(200).json({
    ok: true,
    method: "GET",
    userText,
    reply: "NPC heard: " + userText
  });
});

/*
  POST route (kept for later / Roblox if needed)
*/
app.post(["/npc-chat", "/npc-chat/"], (req, res) => {
  const userText = (req.body?.userText ?? "").toString();
  res.status(200).json({
    ok: true,
    method: "POST",
    userText,
    reply: "NPC heard: " + userText
  });
});

// Catch-all (must stay LAST)
app.all("*", (req, res) => {
  res.status(404).send(`Not found: ${req.method} ${req.path}`);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, "0.0.0.0", () => {
  console.log("Listening on port " + PORT);
});


