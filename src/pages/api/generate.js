const { GoogleGenerativeAI } = require("@google/generative-ai");

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: "Prompt is required" });
  }

  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(`You are a professional content creator.\n${prompt}`);
    const data = result.response.text();

    res.status(200).json({ result: data || "No content generated." });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch content." });
  }
}
