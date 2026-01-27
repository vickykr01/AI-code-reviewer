import { Groq } from "groq-sdk";
import dotenv from "dotenv";

dotenv.config();

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export default async function aiService(prompt) {
  const completion = await groq.chat.completions.create({
    model: "llama-3.1-8b-instant", // ✅ supported model
    messages: [{ role: "user", content: prompt }],
    temperature: 0.7,
    max_tokens: 1024,
  });

  return completion.choices[0].message.content;
}
