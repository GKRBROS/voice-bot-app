import axios from "axios";
import dotenv from "dotenv";
dotenv.config(); // must come before accessing process.env
console.log("Gemini Key Loaded:", !!process.env.GEMINI_API_KEY);


const MODEL = "gemini-2.5-pro"; // or "gemini-2.5-flash" for faster responses
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
      "No response received from Gemini.";
    return message;
  } catch (err) {
    console.error("Gemini API Error:", err.response?.data || err.message);
    return (
      err.response?.data?.error?.message ||
      "Error connecting to Gemini API. Please try again."
    );
  }
}
