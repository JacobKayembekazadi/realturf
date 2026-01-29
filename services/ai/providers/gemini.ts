// Google Gemini AI Provider Implementation

import { GoogleGenAI, Type } from "@google/genai";
import type {
  AIProvider,
  AIProviderConfig,
  ChatMessage,
  ProjectDetails,
  QuoteAnalysisResult,
  RecommendationsResult,
  ImageData,
} from "../types";

export class GeminiProvider implements AIProvider {
  readonly name = "Google Gemini";
  private client: GoogleGenAI | null = null;
  private model: string;

  constructor(config: AIProviderConfig) {
    if (config.apiKey) {
      this.client = new GoogleGenAI({ apiKey: config.apiKey });
    }
    this.model = config.model || "gemini-2.0-flash";
  }

  get isConfigured(): boolean {
    return this.client !== null;
  }

  async chat(
    history: ChatMessage[],
    newMessage: string,
    systemPrompt: string
  ): Promise<string> {
    if (!this.client) {
      return "API key not configured. Please contact support.";
    }

    // Convert history to Gemini format
    const geminiHistory = history.map((msg) => ({
      role: msg.role === "user" ? "user" : "model",
      parts: [{ text: msg.content }],
    }));

    const chat = this.client.chats.create({
      model: this.model,
      config: {
        systemInstruction: systemPrompt,
      },
      history: geminiHistory,
    });

    try {
      const result = await chat.sendMessage({ message: newMessage });
      return result.text || "I'm sorry, I couldn't process that. Could you rephrase?";
    } catch (error) {
      console.error("Gemini Chat Error:", error);
      return "Sorry, I'm having trouble with this conversation. Please try starting a new one.";
    }
  }

  async getRecommendations(
    userInput: string,
    productList: string
  ): Promise<RecommendationsResult> {
    if (!this.client) {
      return {
        recommendations: [
          { productName: "Absolute", reason: "API not configured. Please contact support." },
        ],
      };
    }

    const prompt = `Based on the following user need, recommend 2-3 products from the list provided. Explain why each is a good fit in one sentence.
    User need: "${userInput}"
    Product List: ${productList}

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

    try {
      const response = await this.client.models.generateContent({
        model: this.model,
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: schema,
        },
      });

      return JSON.parse(response.text || "{}");
    } catch (error) {
      console.error("Gemini Recommendations Error:", error);
      return {
        recommendations: [
          { productName: "Absolute", reason: "Unable to generate recommendations. Please try again." },
        ],
      };
    }
  }

  async analyzeQuote(
    projectDetails: ProjectDetails,
    productList: string,
    image?: ImageData
  ): Promise<QuoteAnalysisResult> {
    if (!this.client) {
      return {
        recommendations: [
          { productName: "Absolute", reason: "API not configured. Please contact support." },
        ],
        analysis: "Unable to analyze project - API key not configured.",
      };
    }

    const contents: Array<{ text?: string; inlineData?: { mimeType: string; data: string } }> = [
      {
        text: `You are a turf expert. A customer has provided project details and an image. Analyze the information and recommend the top 2-3 RealTurf products. Do not mention price. Briefly explain your choices and provide a short analysis of the project.
        Project Details: ${JSON.stringify(projectDetails)}
        Product List: ${productList}

        Respond ONLY with a valid JSON object matching the schema. Prioritize products that match the 'usage' criteria.`,
      },
    ];

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
          description: "A brief analysis of the project based on the provided details and image.",
        },
      },
      required: ["recommendations", "analysis"],
    };

    try {
      const response = await this.client.models.generateContent({
        model: this.model,
        contents: { parts: contents },
        config: {
          responseMimeType: "application/json",
          responseSchema: schema,
        },
      });

      return JSON.parse(response.text || "{}");
    } catch (error) {
      console.error("Gemini Quote Analysis Error:", error);
      return {
        recommendations: [
          { productName: "Absolute", reason: "Unable to analyze project. Please try again." },
        ],
        analysis: "Could not generate a detailed analysis, but our team can help you find the perfect fit.",
      };
    }
  }
}
