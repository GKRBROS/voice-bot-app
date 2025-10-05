import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { chatWithGemini } from "./api/chat.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());
app.use(express.static("public"));

// POST endpoint for chat
app.post("/api/chat", async (req, res) => {
  const { text } = req.body;
  const reply = await chatWithGemini(text);
  res.json({ response: reply });
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`✅ Voice bot running at http://localhost:${process.env.PORT || 3000}`);
});
