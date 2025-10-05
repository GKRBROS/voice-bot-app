import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { chatWithGemini } from "./api/chat.js";
import dotenv from "dotenv";

// ✅ Load .env only in local development (not needed on Vercel)
if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());
app.use(express.static("public"));

app.post("/api/chat", async (req, res) => {
  const { text } = req.body;
  const reply = await chatWithGemini(text);
  res.json({ response: reply });
});

// ✅ Vercel provides PORT automatically, fallback for local
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`✅ Server running on http://localhost:${port}`);
});
