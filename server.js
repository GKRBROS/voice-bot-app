import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { chatWithGemini } from "./api/chat.js";

if (process.env.NODE_ENV !== "production") dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.post("/api/chat", async (req, res) => {
  const { text } = req.body;
  const reply = await chatWithGemini(text);
  res.json({ response: reply });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`✅ Server running on port ${port}`));

export default app; // ✅ required for Vercel
