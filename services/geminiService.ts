// Re-export from the new provider-agnostic AI service
// This file maintains backward compatibility with existing imports

export {
  getChatResponse,
  getProductRecommendations,
  getQuoteAnalysis,
  isAIConfigured,
  getProviderName,
} from "./ai";

export type { ProjectDetails, ChatMessage, AIProviderType } from "./ai";
