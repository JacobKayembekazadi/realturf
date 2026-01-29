// OpenAI Provider Implementation

import type {
  AIProvider,
  AIProviderConfig,
  ChatMessage,
  ProjectDetails,
  QuoteAnalysisResult,
  RecommendationsResult,
  ImageData,
} from "../types";

interface OpenAIMessage {
  role: "system" | "user" | "assistant";
  content: string | Array<{ type: string; text?: string; image_url?: { url: string } }>;
}

interface OpenAIResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
}

export class OpenAIProvider implements AIProvider {
  readonly name = "OpenAI";
  private apiKey: string | null = null;
  private model: string;
  private baseUrl = "https://api.openai.com/v1";

  constructor(config: AIProviderConfig) {
    if (config.apiKey) {
      this.apiKey = config.apiKey;
    }
    this.model = config.model || "gpt-4o-mini";
  }

  get isConfigured(): boolean {
    return this.apiKey !== null;
  }

  private async makeRequest(
    messages: OpenAIMessage[],
    jsonMode = false
  ): Promise<string> {
    if (!this.apiKey) {
      throw new Error("API key not configured");
    }

    const response = await fetch(`${this.baseUrl}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify({
        model: this.model,
        messages,
        ...(jsonMode && { response_format: { type: "json_object" } }),
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`OpenAI API error: ${error}`);
    }

    const data: OpenAIResponse = await response.json();
    return data.choices[0]?.message?.content || "";
  }

  async chat(
    history: ChatMessage[],
    newMessage: string,
    systemPrompt: string
  ): Promise<string> {
    if (!this.apiKey) {
      return "API key not configured. Please contact support.";
    }

    const messages: OpenAIMessage[] = [
      { role: "system" as const, content: systemPrompt },
      ...history.map((msg) => ({
        role: (msg.role === "user" ? "user" : "assistant") as "user" | "assistant",
        content: msg.content,
      })),
      { role: "user" as const, content: newMessage },
    ];

    try {
      return await this.makeRequest(messages);
    } catch (error) {
      console.error("OpenAI Chat Error:", error);
      return "Sorry, I'm having trouble with this conversation. Please try starting a new one.";
    }
  }

  async getRecommendations(
    userInput: string,
    productList: string
  ): Promise<RecommendationsResult> {
    if (!this.apiKey) {
      return {
        recommendations: [
          { productName: "Absolute", reason: "API not configured. Please contact support." },
        ],
      };
    }

    const prompt = `Based on the following user need, recommend 2-3 products from the list provided. Explain why each is a good fit in one sentence.
    User need: "${userInput}"
    Product List: ${productList}

    Respond with a JSON object with this exact structure:
    {
      "recommendations": [
        { "productName": "Product Name", "reason": "Why it's a good fit" }
      ]
    }`;

    const messages: OpenAIMessage[] = [
      {
        role: "system",
        content: "You are a helpful turf product expert. Always respond with valid JSON.",
      },
      { role: "user", content: prompt },
    ];

    try {
      const response = await this.makeRequest(messages, true);
      return JSON.parse(response);
    } catch (error) {
      console.error("OpenAI Recommendations Error:", error);
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
    if (!this.apiKey) {
      return {
        recommendations: [
          { productName: "Absolute", reason: "API not configured. Please contact support." },
        ],
        analysis: "Unable to analyze project - API key not configured.",
      };
    }

    const prompt = `You are a turf expert. A customer has provided project details${image ? " and an image" : ""}. Analyze the information and recommend the top 2-3 RealTurf products. Do not mention price. Briefly explain your choices and provide a short analysis of the project.
    Project Details: ${JSON.stringify(projectDetails)}
    Product List: ${productList}

    Respond with a JSON object with this exact structure:
    {
      "recommendations": [
        { "productName": "Product Name", "reason": "Why it's a good fit" }
      ],
      "analysis": "Brief analysis of the project"
    }
    Prioritize products that match the 'usage' criteria.`;

    const content: Array<{ type: string; text?: string; image_url?: { url: string } }> = [
      { type: "text", text: prompt },
    ];

    if (image) {
      content.push({
        type: "image_url",
        image_url: { url: `data:${image.mimeType};base64,${image.data}` },
      });
    }

    const messages: OpenAIMessage[] = [
      {
        role: "system",
        content: "You are a helpful turf product expert. Always respond with valid JSON.",
      },
      { role: "user", content },
    ];

    try {
      const response = await this.makeRequest(messages, true);
      return JSON.parse(response);
    } catch (error) {
      console.error("OpenAI Quote Analysis Error:", error);
      return {
        recommendations: [
          { productName: "Absolute", reason: "Unable to analyze project. Please try again." },
        ],
        analysis: "Could not generate a detailed analysis, but our team can help you find the perfect fit.",
      };
    }
  }
}
