// AI Service - Provider-agnostic AI service factory
// Supports multiple AI providers: Gemini, OpenAI, Anthropic

import type { AIProvider, AIProviderType, ChatMessage } from "./types";
import { GeminiProvider, OpenAIProvider, AnthropicProvider } from "./providers";
import { allProducts, KNOWLEDGE_BASE_CONTEXT } from "../../constants";

// Environment configuration
const AI_PROVIDER = (process.env.AI_PROVIDER as AIProviderType) || "gemini";
const API_KEY = process.env.API_KEY || "";
const AI_MODEL = process.env.AI_MODEL || undefined;

// Create the appropriate provider based on configuration
function createProvider(): AIProvider | null {
  if (!API_KEY) {
    console.warn("API_KEY environment variable not set. AI features will not work.");
    return null;
  }

  const config = { apiKey: API_KEY, model: AI_MODEL };

  switch (AI_PROVIDER) {
    case "openai":
      console.log("Using OpenAI provider");
      return new OpenAIProvider(config);
    case "anthropic":
      console.log("Using Anthropic provider");
      return new AnthropicProvider(config);
    case "gemini":
    default:
      console.log("Using Gemini provider");
      return new GeminiProvider(config);
  }
}

// Singleton provider instance
const provider = createProvider();

// System prompt for chat functionality
const CHAT_SYSTEM_PROMPT = `You are RealTurf's friendly and helpful AI assistant. Your goal is to answer questions about artificial turf products, installation, maintenance, and dealers based on the provided knowledge base. Keep responses concise and helpful, typically 2-3 paragraphs. Do not mention pricing. Here is the knowledge base:\n\n${KNOWLEDGE_BASE_CONTEXT}`;

// Product list for AI context
const PRODUCT_LIST = JSON.stringify(
  allProducts.map((p) => ({
    name: p.name,
    description: p.description,
    apps: p.apps,
    features: p.features,
  }))
);

// Check if AI is configured
export function isAIConfigured(): boolean {
  return provider?.isConfigured ?? false;
}

// Get provider name
export function getProviderName(): string {
  return provider?.name ?? "Not configured";
}

// Chat response
export async function getChatResponse(
  history: { role: "user" | "model"; parts: { text: string }[] }[],
  newMessage: string
): Promise<string> {
  if (!provider) {
    return "API key not configured. Please contact support.";
  }

  // Convert from Gemini format to generic format
  const convertedHistory: ChatMessage[] = history.map((msg) => ({
    role: msg.role === "user" ? "user" : "assistant",
    content: msg.parts[0]?.text || "",
  }));

  return provider.chat(convertedHistory, newMessage, CHAT_SYSTEM_PROMPT);
}

// Product recommendations
export async function getProductRecommendations(userInput: string): Promise<string> {
  if (!provider) {
    return JSON.stringify({
      recommendations: [
        { productName: "Absolute", reason: "API not configured. Please contact support." },
      ],
    });
  }

  const result = await provider.getRecommendations(userInput, PRODUCT_LIST);
  return JSON.stringify(result);
}

// Quote analysis
export interface ProjectDetails {
  description: string;
  sqft: string;
  usage: string[];
  location: string;
}

export async function getQuoteAnalysis(
  projectDetails: ProjectDetails,
  image?: { mimeType: string; data: string }
): Promise<string> {
  if (!provider) {
    return JSON.stringify({
      recommendations: [
        { productName: "Absolute", reason: "API not configured. Please contact support." },
      ],
      analysis: "Unable to analyze project - API key not configured.",
    });
  }

  const result = await provider.analyzeQuote(projectDetails, PRODUCT_LIST, image);
  return JSON.stringify(result);
}

// Export types for external use
export type { ChatMessage, AIProviderType } from "./types";
