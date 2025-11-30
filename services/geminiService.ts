import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getGeminiResponse = async (prompt: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        systemInstruction: "You are a professional and encouraging CPNS (Indonesian Civil Servant) Tutor named 'Mentor AI NIP Warrior'. You are expert in TWK (National Insight), TIU (General Intelligence), and TKP (Personal Characteristics). Provide concise, accurate explanations in Indonesian."
      }
    });

    return response.text || "Maaf, saya tidak dapat memproses permintaan saat ini.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Terjadi kesalahan saat menghubungkan ke Mentor AI. Pastikan koneksi internet Anda lancar.";
  }
};