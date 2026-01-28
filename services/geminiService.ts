
import { GoogleGenAI, GenerateContentResponse, Type } from "@google/genai";
import { allProducts, KNOWLEDGE_BASE_CONTEXT } from "../constants";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.warn("API_KEY environment variable not set. AI features will not work.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

// Helper function to handle API calls and errors
async function makeApiCall(prompt: string, schema?: any): Promise<string> {
  if (!API_KEY) {
    return "API key not configured. Please contact support.";
  }
  try {
    const config: any = {};
    if (schema) {
      config.responseMimeType = "application/json";
      config.responseSchema = schema;
    }

    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config,
    });
    
    return response.text || "I'm sorry, I couldn't generate a response. Please try again.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Sorry, I'm having trouble connecting to my brain right now. Please try again later.";
  }
}

export const getChatResponse = async (history: { role: 'user' | 'model'; parts: { text: string }[] }[], newMessage: string): Promise<string> => {
  const chat = ai.chats.create({
    model: 'gemini-3-flash-preview',
    config: {
      systemInstruction: `You are RealTurf's friendly and helpful AI assistant. Your goal is to answer questions about artificial turf products, installation, maintenance, and dealers based on the provided knowledge base. Keep responses concise and helpful, typically 2-3 paragraphs. Do not mention pricing. Here is the knowledge base:\n\n${KNOWLEDGE_BASE_CONTEXT}`
    },
    history
  });

  try {
    const result = await chat.sendMessage({ message: newMessage });
    return result.text || "I'm sorry, I couldn't process that. Could you rephrase?";
  } catch (error) {
    console.error("Gemini Chat Error:", error);
    return "Sorry, I'm having trouble with this conversation. Please try starting a new one.";
  }
};

export const getProductRecommendations = async (userInput: string): Promise<string> => {
  const prompt = `Based on the following user need, recommend 2-3 products from the list provided. Explain why each is a good fit in one sentence.
  User need: "${userInput}"
  Product List: ${JSON.stringify(allProducts.map(p => ({ name: p.name, description: p.description, apps: p.apps, features: p.features })))}
  
  Respond ONLY with a valid JSON object matching the schema.`;
  
  const schema = {
    type: Type.OBJECT,
    properties: {
      recommendations: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            productName: { type: Type.STRING },
            reason: { type: Type.STRING },
          },
          required: ["productName", "reason"],
        },
      },
    },
    required: ["recommendations"],
  };

  return makeApiCall(prompt, schema);
};

export const getQuoteAnalysis = async (projectDetails: any, image?: { mimeType: string; data: string }): Promise<string> => {
  const contents: any = [{
    text: `You are a turf expert. A customer has provided project details and an image. Analyze the information and recommend the top 2-3 RealTurf products. Do not mention price. Briefly explain your choices and provide a short analysis of the project.
    Project Details: ${JSON.stringify(projectDetails)}
    Product List: ${JSON.stringify(allProducts.map(p => ({ name: p.name, description: p.description, apps: p.apps, features: p.features })))}
    
    Respond ONLY with a valid JSON object matching the schema. Prioritize products that match the 'usage' criteria.`
  }];

  if (image) {
    contents.push({ inlineData: image });
  }

  const schema = {
    type: Type.OBJECT,
    properties: {
      recommendations: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            productName: { type: Type.STRING },
            reason: { type: Type.STRING },
          },
          required: ["productName", "reason"],
        },
      },
      analysis: {
        type: Type.STRING,
        description: "A brief analysis of the project based on the provided details and image."
      }
    },
    required: ["recommendations", "analysis"]
  };
  
  const response = await ai.models.generateContent({
    model: image ? 'gemini-3-flash-preview' : 'gemini-3-flash-preview',
    contents: { parts: contents },
    config: {
      responseMimeType: "application/json",
      responseSchema: schema
    }
  });

  return response.text || "{}";
};
