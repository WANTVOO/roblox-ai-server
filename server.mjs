import express from "express";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is running!");
});

// Quick browser test route
app.get("/npc-chat", (req, res) => {
  res.status(200).send("npc-chat route is live (POST to chat)");
});

app.post("/npc-chat", (req, res) => {
  const userText = (req.body?.userText ?? "").toString();
  res.json({ reply: "NPC heard: " + userText });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, "0.0.0.0", () => {
  console.log("Listening on port " + PORT);
});
