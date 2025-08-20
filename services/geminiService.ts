
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

let ai: GoogleGenAI | null = null;

const getAI = () => {
    if (!ai) {
        if (!process.env.API_KEY) {
            throw new Error("API_KEY is not set in the environment. Please configure it to use the Playground.");
        }
        ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    }
    return ai;
}


export const generateResponseStream = async (prompt: string, systemInstruction: string): Promise<AsyncGenerator<GenerateContentResponse>> => {
    try {
        const genAI = getAI();
        const response = await genAI.models.generateContentStream({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                systemInstruction: systemInstruction,
                thinkingConfig: { thinkingBudget: 0 } // Disable thinking for faster streaming response
            },
        });
        return response;
    } catch (error) {
        console.error("Error generating content stream:", error);
        if (error instanceof Error) {
             throw error; // Re-throw specific API errors
        }
        // For other errors, wrap them.
        throw new Error("Failed to communicate with the Gemini API. Please check your network connection.");
    }
};
