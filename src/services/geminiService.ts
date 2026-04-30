import type {
  Product,
  CartItem,
  GeminiRequestBody,
  GeminiResponse,
  GeminiApiResult,
  ErrorMessagesMap,
} from "../types/chat.types";

const askGemini = async (
  userMessage: string,
  products: Product[],
  cartItems: CartItem[]
): Promise<string> => {
  const apiKey = process.env.REACT_APP_GEMINI_API_KEY;
  const baseUrl = process.env.REACT_APP_GEMINI_BASE_URL;

  if (!apiKey) {
    throw new Error(
      "Gemini API key not found. Please set REACT_APP_GEMINI_API_KEY environment variable."
    );
  }

  if (!baseUrl) {
    throw new Error(
      "Gemini base URL not found. Please set REACT_APP_GEMINI_BASE_URL environment variable."
    );
  }

  // Create system prompt
  let systemPrompt = `You are a shopping assistant. You help users ONLY with products and shopping.

Available products:
${JSON.stringify(products, null, 2)}`;

  if (cartItems && cartItems.length > 0) {
    systemPrompt += `

User's cart contains:
${JSON.stringify(cartItems, null, 2)}`;
  }

  systemPrompt += `

Rules:
- YOU MUST RESPOND IN ENGLISH ONLY - NO EXCEPTIONS
- NEVER use Turkish or any other language - ONLY ENGLISH
- Keep responses short and friendly, maximum 3-4 sentences
- Mention prices and features in product recommendations
- Consider items in the cart

IMPORTANT - Off-topic Questions:
- If the question is NOT related to products, shopping, cart, or store:
  "Sorry, I can only help with products and shopping. I can provide information about our products, make recommendations, or answer questions about your cart. 🛒"
- DO NOT answer general questions (weather, dates, math, etc.)
- DO NOT answer politics, religion, personal topics
- Stay only in e-commerce assistant role`;

  const fullPrompt = systemPrompt + "\n\nUser question: " + userMessage;

  // Model priority list - stable models first
  const models = [
    "gemini-2.0-flash-lite", // Most stable
    "gemini-flash-lite-latest", // Latest lite
    "gemini-2.5-flash-lite", // Newest but might be busy
  ];

  const MAX_RETRIES = 1;
  const INITIAL_DELAY = 500;

  // User-friendly error messages
  const ERROR_MESSAGES: ErrorMessagesMap = {
    503: "Assistant is currently busy. Please try again in a few seconds. ⏳",
    429: "Too many requests sent. Please wait a moment. ⏱️",
    400: "Something went wrong. Please rephrase your question. 🤔",
    401: "System configuration error. Please contact administrator. ⚙️",
    404: "Assistant temporarily unavailable. Please try again later. 🔧",
    500: "An unexpected error occurred. Please try again. ⚠️",
    network: "Please check your internet connection. 📡",
    timeout: "Request timed out. Please try again. ⏰",
    default:
      "Assistant cannot respond right now. Please try again in a few minutes. 💬",
  };

  // Helper: Exponential backoff delay
  const delay = (ms: number): Promise<void> =>
    new Promise((resolve) => setTimeout(resolve, ms));

  // Helper: Make API request
  const makeRequest = async (modelName: string): Promise<GeminiApiResult> => {
    const url = `${baseUrl}beta/models/${modelName}:generateContent?key=${apiKey}`;

    const requestBody: GeminiRequestBody = {
      contents: [
        {
          parts: [
            {
              text: fullPrompt,
            },
          ],
        },
      ],
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 1024,
      },
    };

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return {
        success: false,
        status: response.status,
        error: errorData.error,
      };
    }

    const data: GeminiResponse = await response.json();

    if (data.candidates && data.candidates[0] && data.candidates[0].content) {
      const text = data.candidates[0].content.parts[0].text;
      return { success: true, text };
    }

    return {
      success: false,
      status: 500,
      error: {
        code: 500,
        message: "Unexpected response format",
        status: "UNKNOWN",
      },
    };
  };

  // Try each model with retry logic
  for (let modelIndex = 0; modelIndex < models.length; modelIndex++) {
    const modelName = models[modelIndex];

    for (let retry = 0; retry <= MAX_RETRIES; retry++) {
      try {
        const result = await makeRequest(modelName);

        if (result.success && result.text) {
          return result.text;
        }

        const { status } = result;

        if (!status) {
          throw new Error("Unexpected error: Status code not found");
        }

        if (status === 429) {
          break; // Skip retry, try next model
        }

        if (status === 503) {
          if (retry < MAX_RETRIES) {
            const backoffDelay = INITIAL_DELAY * Math.pow(2, retry);
            await delay(backoffDelay);
            continue;
          } else {
            break;
          }
        }

        if (status === 400 || status === 404) {
          break;
        }

        const userMessage =
          ERROR_MESSAGES[status as keyof ErrorMessagesMap] ||
          ERROR_MESSAGES.default;
        throw new Error(userMessage);
      } catch (error) {
        if (retry < MAX_RETRIES) {
          const backoffDelay = INITIAL_DELAY * Math.pow(2, retry);
          await delay(backoffDelay);
          continue;
        } else if (modelIndex < models.length - 1) {
          break;
        } else {
          if (
            error instanceof Error &&
            (error.message.includes("fetch") ||
              error.message.includes("network"))
          ) {
            throw new Error(ERROR_MESSAGES.network);
          }

          if (
            error instanceof Error &&
            Object.values(ERROR_MESSAGES).includes(error.message)
          ) {
            throw error;
          }

          throw new Error(ERROR_MESSAGES.default);
        }
      }
    }
  }

  throw new Error(ERROR_MESSAGES.default);
};

export { askGemini };
