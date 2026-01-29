// Anthropic Claude Provider Implementation

import type {
  AIProvider,
  AIProviderConfig,
  ChatMessage,
  ProjectDetails,
  QuoteAnalysisResult,
  RecommendationsResult,
  ImageData,
} from "../types";

interface AnthropicMessage {
  role: "user" | "assistant";
  content: string | Array<{ type: string; text?: string; source?: { type: string; media_type: string; data: string } }>;
}

interface AnthropicResponse {
  content: Array<{
    type: string;
    text: string;
  }>;
}

export class AnthropicProvider implements AIProvider {
  readonly name = "Anthropic Claude";
  private apiKey: string | null = null;
  private model: string;
  private baseUrl = "https://api.anthropic.com/v1";

  constructor(config: AIProviderConfig) {
    if (config.apiKey) {
      this.apiKey = config.apiKey;
    }
    this.model = config.model || "claude-sonnet-4-20250514";
  }

  get isConfigured(): boolean {
    return this.apiKey !== null;
  }

  private async makeRequest(
    messages: AnthropicMessage[],
    systemPrompt?: string
  ): Promise<string> {
    if (!this.apiKey) {
      throw new Error("API key not configured");
    }

    const response = await fetch(`${this.baseUrl}/messages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": this.apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: this.model,
        max_tokens: 4096,
        ...(systemPrompt && { system: systemPrompt }),
        messages,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Anthropic API error: ${error}`);
    }

    const data: AnthropicResponse = await response.json();
    return data.content[0]?.text || "";
  }

  async chat(
    history: ChatMessage[],
    newMessage: string,
    systemPrompt: string
  ): Promise<string> {
    if (!this.apiKey) {
      return "API key not configured. Please contact support.";
    }

    const messages: AnthropicMessage[] = [
      ...history.map((msg) => ({
        role: (msg.role === "user" ? "user" : "assistant") as "user" | "assistant",
        content: msg.content,
      })),
      { role: "user" as const, content: newMessage },
    ];

    try {
      return await this.makeRequest(messages, systemPrompt);
    } catch (error) {
      console.error("Anthropic Chat Error:", error);
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

    Respond with ONLY a JSON object (no markdown, no code blocks) with this exact structure:
    {
      "recommendations": [
        { "productName": "Product Name", "reason": "Why it's a good fit" }
      ]
    }`;

    const messages: AnthropicMessage[] = [{ role: "user", content: prompt }];

    try {
      const response = await this.makeRequest(
        messages,
        "You are a helpful turf product expert. Always respond with valid JSON only, no markdown formatting."
      );
      // Extract JSON from response (Claude might add some text)
      const jsonMatch = response.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
      return JSON.parse(response);
    } catch (error) {
      console.error("Anthropic Recommendations Error:", error);
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

    Respond with ONLY a JSON object (no markdown, no code blocks) with this exact structure:
    {
      "recommendations": [
        { "productName": "Product Name", "reason": "Why it's a good fit" }
      ],
      "analysis": "Brief analysis of the project"
    }
    Prioritize products that match the 'usage' criteria.`;

    let content: string | Array<{ type: string; text?: string; source?: { type: string; media_type: string; data: string } }>;

    if (image) {
      content = [
        { type: "text", text: prompt },
        {
          type: "image",
          source: {
            type: "base64",
            media_type: image.mimeType,
            data: image.data,
          },
        },
      ];
    } else {
      content = prompt;
    }

    const messages: AnthropicMessage[] = [{ role: "user", content }];

    try {
      const response = await this.makeRequest(
        messages,
        "You are a helpful turf product expert. Always respond with valid JSON only, no markdown formatting."
      );
      // Extract JSON from response
      const jsonMatch = response.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
      return JSON.parse(response);
    } catch (error) {
      console.error("Anthropic Quote Analysis Error:", error);
      return {
        recommendations: [
          { productName: "Absolute", reason: "Unable to analyze project. Please try again." },
        ],
        analysis: "Could not generate a detailed analysis, but our team can help you find the perfect fit.",
      };
    }
  }
}
