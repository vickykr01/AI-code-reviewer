const aiServices = require("../services/ai.services.js");

module.exports.getReview = async (req, res) => {
  const { code } = req.body;
  if (!code) {
    res.status(400).send("Code is required");
  }
  try {
    const response = await aiServices(code);
    res.send(response);
  } catch (error) {
    res.status(500).send("AI Error: " + error.message);
  }
};
