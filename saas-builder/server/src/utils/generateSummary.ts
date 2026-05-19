function generateSummary(
  answers: string[]
) {
  return `
# SaaS Project Summary

## User Requirements
${answers.map((a) => `- ${a}`).join("\n")}

---

# Recommended MVP Features
- Authentication System
- Dashboard
- Core SaaS Workflow
- User Management
- Subscription/Billing
- AI Integration Layer

---

# Suggested Tech Stack
- React
- Express.js
- TypeScript
- Gemini/OpenAI API
- PostgreSQL

---

# Monetization Ideas
- Monthly Subscription
- Freemium Model
- AI Usage Credits

---

# Recommended Next Steps
1. Build MVP quickly
2. Validate with real users
3. Focus on one core feature
4. Improve based on feedback

---

# Final Advice
Keep the first version simple and launch early.
`;
}

export default generateSummary;