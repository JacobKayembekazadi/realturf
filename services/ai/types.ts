// AI Provider Types - Provider-agnostic interfaces for AI services

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface AIProviderConfig {
  apiKey: string;
  model?: string;
}

export interface ProjectDetails {
  description: string;
  sqft: string;
  usage: string[];
  location: string;
}

export interface ProductRecommendation {
  productName: string;
  reason: string;
}

export interface QuoteAnalysisResult {
  recommendations: ProductRecommendation[];
  analysis: string;
}

export interface RecommendationsResult {
  recommendations: ProductRecommendation[];
}

export interface ImageData {
  mimeType: string;
  data: string; // base64 encoded
}

// Abstract interface that all AI providers must implement
export interface AIProvider {
  readonly name: string;
  readonly isConfigured: boolean;

  // Chat functionality
  chat(history: ChatMessage[], newMessage: string, systemPrompt: string): Promise<string>;

  // Structured output for product recommendations
  getRecommendations(userInput: string, productList: string): Promise<RecommendationsResult>;

  // Quote analysis with optional image support
  analyzeQuote(projectDetails: ProjectDetails, productList: string, image?: ImageData): Promise<QuoteAnalysisResult>;
}

// Provider types supported
export type AIProviderType = 'gemini' | 'openai' | 'anthropic';

// Configuration for the AI service
export interface AIServiceConfig {
  provider: AIProviderType;
  apiKey: string;
  model?: string;
}
