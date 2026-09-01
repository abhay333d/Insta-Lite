const { GoogleGenAI } = require("@google/genai");
require("dotenv").config();

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const generateCaption = async (base64IamageFile, mime_type) => {
  try {
    const interaction = await ai.interactions.create({
      model: "gemini-3.7-flash",
      input: [
        { type: "text", text: "Caption this image." },
        {
          type: "image",
          data: base64IamageFile,
          mime_type: mime_type,
        },
      ],
    });
    return interaction.output_text;
  } catch (err) {
    console.error("Error generating caption from Gemini:", err);
    throw new Error("Failed to generate caption");
  }
};

module.exports = generateCaption;
