import axios from "axios";
import dotenv from "dotenv";

if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

const MODEL = "gemini-2.5-pro";
const BASE_URL = "https://generativelanguage.googleapis.com/v1beta";
const ENDPOINT = `${BASE_URL}/models/${MODEL}:generateContent`;

export async function chatWithGemini(text) {
  if (!text || !text.trim()) return "Please say something.";

  try {
    const response = await axios.post(
      `${ENDPOINT}?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [
          {
            role: "user",
            parts: [{ text: text.trim() }]
          }
        ]
      },
      { headers: { "Content-Type": "application/json" } }
    );

    const message =
      response.data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No response from Gemini.";
    return message;
  } catch (err) {
    console.error("Gemini API Error:", err.response?.data || err.message);
    return (
      err.response?.data?.error?.message ||
      "Error connecting to Gemini API. Please try again."
    );
  }
}
