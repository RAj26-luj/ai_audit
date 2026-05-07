export const APP_NAME = "StackAudit";

export const CREDEX_URL =
  "https://credex.rocks";

export type ToolType = {
  id: string;
  name: string;
  icon: string;
  plans: string[];

  basePrice: {
    [key: string]: number;
  };
};

export const TOOLS_CONFIG: ToolType[] = [
  {
    id: "cursor",
    name: "Cursor",
    icon: "/logos/cursor.png",

    plans: [
      "Hobby",
      "Pro",
      "Business",
      "Enterprise",
    ],

    basePrice: {
      Hobby: 0,
      Pro: 20,
      Business: 40,
      Enterprise: 100,
    },
  },

  {
    id: "copilot",
    name: "GitHub Copilot",
    icon: "/logos/copilot.png",

    plans: [
      "Individual",
      "Business",
      "Enterprise",
    ],

    basePrice: {
      Individual: 10,
      Business: 19,
      Enterprise: 39,
    },
  },

  {
    id: "claude",
    name: "Claude",
    icon: "/logos/claude.png",

    plans: [
      "Free",
      "Pro",
      "Max",
      "Team",
      "Enterprise",
      "API Direct",
    ],

    basePrice: {
      Free: 0,
      Pro: 20,
      Max: 100,
      Team: 30,
      Enterprise: 75,
      "API Direct": 50,
    },
  },

  {
    id: "chatgpt",
    name: "ChatGPT",
    icon: "/logos/chatgpt.png",

    plans: [
      "Plus",
      "Team",
      "Enterprise",
      "API Direct",
    ],

    basePrice: {
      Plus: 20,
      Team: 25,
      Enterprise: 60,
      "API Direct": 45,
    },
  },

  {
    id: "anthropic",
    name: "Anthropic API",
    icon: "/logos/anthropic.png",

    plans: ["API Direct"],

    basePrice: {
      "API Direct": 60,
    },
  },

  {
    id: "openai",
    name: "OpenAI API",
    icon: "/logos/openai.png",

    plans: ["API Direct"],

    basePrice: {
      "API Direct": 50,
    },
  },

  {
    id: "gemini",
    name: "Gemini",
    icon: "/logos/gemini.png",

    plans: [
      "Pro",
      "Ultra",
      "API",
    ],

    basePrice: {
      Pro: 20,
      Ultra: 40,
      API: 30,
    },
  },

  {
    id: "v0",
    name: "v0.dev",
    icon: "/logos/v0.png",

    plans: [
      "Free",
      "Premium",
      "Team",
    ],

    basePrice: {
      Free: 0,
      Premium: 20,
      Team: 30,
    },
  },
];