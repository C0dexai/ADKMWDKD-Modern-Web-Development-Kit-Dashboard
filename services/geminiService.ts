
import { GoogleGenAI, GenerateContentResponse, Part } from "@google/genai";

let ai: GoogleGenAI | null = null;

const getAI = () => {
    if (!ai) {
        if (!import.meta.env.VITE_GEMINI_API_KEY) {
            throw new Error("VITE_GEMINI_API_KEY is not set in the environment. Please configure it to use the Playground.");
        }
        ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });
    }
    return ai;
}

const codeInterpreterTool = {
  functionDeclarations: [
    {
      name: 'code_interpreter',
      description: 'Executes Python code in a sandboxed environment to perform calculations, data analysis, etc. The code should use print() to output results.',
      parameters: {
        type: 'OBJECT',
        properties: {
          code: {
            type: 'STRING',
            description: 'The Python code to execute.',
          },
        },
        required: ['code'],
      },
    },
  ],
};

/**
 * Generates an initial response from the agent, which could be a simple text response
 * or a function call to a tool. This is a non-streaming call.
 */
export const generateAgentResponse = async (prompt: string, systemInstruction: string): Promise<GenerateContentResponse> => {
    try {
        const genAI = getAI();
        const response = await genAI.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                systemInstruction,
                tools: [codeInterpreterTool],
            },
        });
        return response;
    } catch (error) {
        console.error("Error generating agent response:", error);
        if (error instanceof Error) throw error;
        throw new Error("Failed to get a response from the Gemini API.");
    }
};

/**
 * Simulates the execution of Python code by sending it to the Gemini API with a specific prompt.
 */
export const executeCode = async (code: string): Promise<string> => {
    try {
        const genAI = getAI();
        const response = await genAI.models.generateContent({
            model: "gemini-2.5-flash",
            contents: code,
            config: {
                systemInstruction: `You are a Python code interpreter. Execute the provided Python code and return ONLY the raw stdout output. Do not include '>>>', 'python', '\`\`\`', or any other explanations, formatting, or commentary.`,
                temperature: 0.0,
            }
        });
        return response.text.trim();
    } catch (error) {
        console.error("Error executing code:", error);
        return "Error: Could not execute code.";
    }
};

/**
 * Generates a final, streaming response from the agent after a tool has been used.
 * It takes the original prompt and the history of the tool interaction as context.
 */
export const generateFinalAnswerStream = async (prompt: string, history: Part[], systemInstruction: string): Promise<AsyncGenerator<GenerateContentResponse>> => {
    try {
        const genAI = getAI();
        const conversationHistory = [
            { role: 'user', parts: [{ text: prompt }] },
            { role: 'model', parts: history }
        ];

        const response = await genAI.models.generateContentStream({
            model: "gemini-2.5-flash",
            contents: conversationHistory,
            config: {
                systemInstruction,
            },
        });
        return response;
    } catch (error) {
        console.error("Error generating final answer stream:", error);
        if (error instanceof Error) throw error;
        throw new Error("Failed to communicate with the Gemini API for the final answer.");
    }
};