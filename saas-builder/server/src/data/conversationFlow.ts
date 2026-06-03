export type ConversationStep = {
  id: string;
  phase: number;
  field: string;
  goal: string;

  inputType: | "text" | "single_select" | "multi_select";
  options?: string[];
  required?: boolean;

  condition?: ( answers: Record<string, any> ) => boolean;
  placeholder?: string;
};

export const conversationFlow: ConversationStep[] = [

  /* PHASE 1 — IDEA DISCOVERY */

  {
    id: "idea_raw_description",
    phase: 1,
    field: "idea_raw_description",
    goal:
      "Hey there 👋 I'm Spark, your idea co-pilot. I've helped hundreds of founders stress-test, shape, and launch their ideas. Tell me, what's been living rent-free in your head lately? An idea, a problem you want to solve, or something you've already started?",
    inputType: "text",
    required: true,
  },

  {
    id: "idea_motivation",
    phase: 1,
    field: "idea_motivation",
    goal:
      "I love that direction. What made you land on this idea? Was there a moment, a frustration, or an opportunity you spotted?",
    inputType: "text",
  },

  /* PHASE 2 — IDEA DISCOVERY */

  {
    id: "idea_type",
    phase: 2,
    field: "idea_type",
    goal:
      "Got it. Help me understand the core of it — in your head, is this more of a product, platform, service, community, or something else entirely?",
    inputType: "single_select",
    options: [
      "Product",
      "Platform",
      "Service",
      "Community",
      "Something Else",
    ],
  },

  {
    id: "business_stage",
    phase: 2,
    field: "business_stage",
    goal:
      "And where are you with it right now — still sketching it out, or have you already started moving?",
    inputType: "single_select",
    options: [
      "Still in my head — ideation phase",
      "I've validated it a bit, getting early traction",
      "We're live and scaling",
    ],
  },

  {
    id: "launch_city",
    phase: 2,
    field: "launch_city",
    goal:
      "Exciting. Where do you picture this launching first — your home city, or are you going straight for a bigger market?",
    inputType: "text",
    placeholder:"Delhi...",
  },

  {
    id: "launch_country",
    phase: 2,
    field: "launch_country",
    goal:
      "And which country are you thinking of launching in first?",
    inputType: "text",
    placeholder:"India...",
  },

  /* PHASE 3 — BUSINESS CONTEXT */

  {
    id: "existing_businesses_count",
    phase: 3,
    field: "existing_businesses_count",
    goal:
      "Before we go deeper, I want to make sure I give you advice that fits where you are. Have you built or run other businesses before, or is this your first rodeo?",
    inputType: "single_select",
    options: [
      "First venture",
      "Yes, I'm running 1 other business",
      "I run 2 or more businesses",
    ],
  },

  {
    id: "existing_businesses_description",
    phase: 3,
    field: "existing_businesses_description",
    goal:
      "That's great experience to bring in. What kind of business(es) are you running?",
    inputType: "text",
    condition: (answers) =>
      answers.existing_businesses_count &&
      answers.existing_businesses_count !==
        "First venture",
    placeholder:"Restaurant, Agency, SaaS..."
  },

  {
    id: "platform_preference",
    phase: 3,
    field: "platform_preference",
    goal:
      "For this idea — are you thinking app, web, or both? Or is it more of an offline or service-first model?",
    inputType: "multi_select",
    options: [
      "Mobile App",
      "Web Platform",
      "Both App + Web",
      "Offline",
      "Service First",
      "Not Sure Yet",
    ],
  },


  /* PHASE 4 — MARKET & MODEL */

  {
    id: "revenue_model",
    phase: 4,
    field: "revenue_model",
    goal:
      "Let's talk money — how do you imagine making revenue from this? Sometimes the model is obvious, sometimes it needs shaping.",
    inputType: "multi_select",
    options: [
      "Subscription",
      "One-Time Purchase / Fixed Cost",
      "Service-Based",
      "Marketplace / Commission",
      "Ads / Sponsorships",
      "Not Sure Yet",
    ],
  },

  {
    id: "requires_ai",
    phase: 4,
    field: "requires_ai",
    goal:
      "Does your idea involve AI in any way — like recommendations, automation, personalization, content generation, or anything like that?",
    inputType: "single_select",
    options: [
      "Yes, AI is core to it",
      "AI could enhance it, but it's not essential",
      "No, it's not AI-based",
    ],
  },

  {
    id: "ai_usecase_description",
    phase: 4,
    field: "ai_usecase_description",
    goal:
      "What kind of AI functionality are you thinking?",
    inputType: "text",
    condition: (answers) =>
      answers.requires_ai ===
        "Yes, AI is core to it" ||
      answers.requires_ai ===
        "AI could enhance it, but it's not essential",
  },

  {
    id: "target_generation",
    phase: 4,
    field: "target_generation",
    goal:
      "Who's this for? Which of these best describes your primary audience?",
    inputType: "multi_select",
    options: [
      "Gen Alpha",
      "Gen Z",
      "Millennials",
      "Gen X",
      "Boomers",
      "Gen Beta",
      "Businesses (B2B)",
    ],
  },

  {
    id: "target_age_range",
    phase: 4,
    field: "target_age_range",
    goal:
      "And if you had to pick a specific age range that's your bullseye — what would it be?",
    inputType: "text",
  },

  {
    id: "target_gender",
    phase: 4,
    field: "target_gender",
    goal:
      "Is your product aimed at a specific gender, or is it for everyone?",
    inputType: "single_select",
    options: [
      "All genders",
      "Primarily women",
      "Primarily men",
      "Non-binary focus",
      "Depends on segment",
    ],
  },

  /* PHASE 5 — CONTACT CAPTURE */

  {
    id: "founder_name",
    phase: 5,
    field: "founder_name",
    goal:
      "Okay — I've got everything I need to build your Idea Blueprint. This will include market sizing, competitor analysis, tech stack, team structure, cost estimates, and a launch roadmap. Where should I send it? Drop your name and email and I'll get this over to you.",
    inputType: "text",
    required: true,
    placeholder: "Your Name, <your.email@example.com>"
  },

  {
    id: "founder_phone",
    phase: 5,
    field: "founder_phone",
    goal:
      "One more thing — if you'd like a quick call to walk through the report together, drop your phone number. Totally optional.",
    inputType: "text",

    placeholder: "e.g., 123-456-7890",
    inputType: "single_select",

    options: ["Skip"],
  },

  {
    id: "founder_city",
    phase: 5,
    field: "founder_city",
    goal:
      "Last thing — what city are you based in?",
    inputType: "text",
    placeholder: "e.g., New York, London, Tokyo...",
  },

  {
    id: "founder_country",
    phase: 5,
    field: "founder_country",
    goal:
      "And which country are you based in?",
    inputType: "text",
    placeholder: "e.g., United States, United Kingdom, Japan...",
  },
];