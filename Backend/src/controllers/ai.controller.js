import aiService from "../services/ai.services.js";

const getResponse = async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    const response = await aiService(prompt);
    res.json({ response });
  } catch (error) {
    console.error("AI Error:", error.message);
    res.status(500).json({ error: "AI service failed" });
  }
};

export default getResponse;
