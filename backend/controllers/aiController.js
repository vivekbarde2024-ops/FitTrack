const chatWithAI = async (req, res) => {
  try {
    const { message, history = [] } = req.body;

    if (!message || typeof message !== "string" || !message.trim()) {
      return res.status(400).json({
        success: false,
        message: "Please enter a message."
      });
    }

    if (message.length > 4000 || !Array.isArray(history) || history.length > 10) {
      return res.status(400).json({
        success: false,
        message: "Message or chat history is too long."
      });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({
        success: false,
        message: "Gemini API key is not configured."
      });
    }

    const { GoogleGenAI } = await import("@google/genai");

    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY
    });

    const contents = [
      ...history.map(item => ({
        role: item.role === "assistant" ? "model" : "user",
        parts: [{ text: String(item.text).slice(0, 4000) }]
      })),
      {
        role: "user",
        parts: [{ text: message.trim() }]
      }
    ];

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents,
      config: {
        systemInstruction: `
          You are FitTrack AI, a friendly fitness and nutrition assistant.

          Help users with:
          1. Workout planning
          2. Nutrition and Indian food
          3. Muscle building
          4. Weight management
          5. Fitness education

          Give clear, practical and beginner-friendly answers.
          Never invent precise nutritional values.
          Avoid extreme diets and unsafe exercise recommendations.
          Do not diagnose medical conditions.
          Recommend professional medical advice when appropriate.
        `,
        temperature: 0.7,
        maxOutputTokens: 1000
      }
    });

    return res.status(200).json({
      success: true,
      reply: response.text
    });

  } catch (error) {
  console.error("Gemini API Error:", error);
  
  return res.status(500).json({
    success: false,
    message: error.message || "AI assistant could not generate a response."
  });
}
};

module.exports = { chatWithAI };