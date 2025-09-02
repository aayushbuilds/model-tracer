export interface Model {
  id: number;
  model: string;
  products: string[];
}

export const modelsData: Model[] = [
  {
    id: 1,
    model: "claude-opus-4.1",
    products: ["Claude Code", "Cursor", "Windsurf", "API", "Claude.ai"]
  },
  {
    id: 2,
    model: "claude-sonnet-3.5",
    products: ["Claude.ai", "Cursor", "Windsurf", "API", "Bolt.new", "v0.dev"]
  },
  {
    id: 3,
    model: "gpt-4o",
    products: ["ChatGPT", "Cursor", "Windsurf", "API", "GitHub Copilot"]
  },
  {
    id: 4,
    model: "gpt-4o-mini",
    products: ["ChatGPT", "API", "Cursor", "Bolt.new"]
  },
  {
    id: 5,
    model: "o1-preview",
    products: ["ChatGPT", "API", "Cursor"]
  },
  {
    id: 6,
    model: "o1-mini",
    products: ["ChatGPT", "API", "Cursor"]
  },
  {
    id: 7,
    model: "gemini-1.5-pro",
    products: ["Google AI Studio", "API", "Cursor", "Vertex AI"]
  },
  {
    id: 8,
    model: "gemini-1.5-flash",
    products: ["Google AI Studio", "API", "Cursor", "Vertex AI"]
  },
  {
    id: 9,
    model: "gemini-2.0-flash",
    products: ["Google AI Studio", "API", "Vertex AI"]
  },
  {
    id: 10,
    model: "deepseek-v3",
    products: ["DeepSeek Chat", "API", "Cursor", "Windsurf"]
  },
  {
    id: 11,
    model: "llama-3.1-405b",
    products: ["Meta AI", "Hugging Face", "API", "Perplexity"]
  },
  {
    id: 12,
    model: "llama-3.1-70b",
    products: ["Meta AI", "Hugging Face", "API", "Perplexity", "Groq"]
  },
  {
    id: 13,
    model: "mistral-large",
    products: ["Mistral AI", "API", "Le Chat", "Cursor"]
  },
  {
    id: 14,
    model: "mixtral-8x7b",
    products: ["Mistral AI", "API", "Hugging Face", "Perplexity"]
  },
  {
    id: 15,
    model: "qwen-2.5-72b",
    products: ["Alibaba Cloud", "API", "Hugging Face"]
  },
  {
    id: 16,
    model: "command-r-plus",
    products: ["Cohere", "API", "Coral"]
  },
  {
    id: 17,
    model: "grok-2",
    products: ["X.ai", "X Premium", "API"]
  },
  {
    id: 18,
    model: "perplexity-sonar",
    products: ["Perplexity", "API"]
  },
  {
    id: 19,
    model: "stable-diffusion-xl",
    products: ["Stability AI", "API", "DreamStudio", "Clipdrop"]
  },
  {
    id: 20,
    model: "dall-e-3",
    products: ["ChatGPT", "API", "Bing Image Creator"]
  }
];