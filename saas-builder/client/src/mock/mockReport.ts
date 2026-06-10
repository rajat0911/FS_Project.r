import type { EvaluationReport } from "../../../shared/types/evaluation";

export const mockReport: EvaluationReport = {
  overall_score: 8.4,

  overall_summary:
    "A promising AI-powered SaaS platform with strong scalability potential and a clear market opportunity.",

  startup_projection: {
    estimated_market_size: "$2.1B",
    market_growth_rate: "15% CAGR",
    projected_yearly_revenue: "$250K",
    projected_monthly_revenue: "$20K",
    estimated_break_even_time: "18 months",
    customer_acquisition_cost: "$45",
    estimated_ltv: "$520",
    startup_success_probability: "68%",
    investor_interest_score: 8.1,
    scalability_rating: 8.8,
    execution_difficulty: "Medium",
    competition_level: "Moderate",
    growth_potential: "High",
    profitability_potential: "High",
  },

  market_potential: {} as any,
  audience_analysis: {} as any,
  tech_stack_analysis: {} as any,
  budget_analysis: {} as any,
  location_analysis: {} as any,
  monetization_analysis: {} as any,
  competition_analysis: {} as any,

  startup_strengths: [
    "Large and growing target market",
    "Strong AI differentiation",
    "Scalable SaaS model",
    "Recurring revenue opportunity",
  ],

  startup_risks: [
    "Customer acquisition costs may rise",
    "Strong existing competitors",
    "Requires product validation",
  ],

  strategic_recommendations: [
    "Launch MVP within 90 days",
    "Validate with 20 pilot customers",
    "Focus on recurring subscription revenue",
  ],

  final_verdict:
    "The startup demonstrates strong commercial potential and investor attractiveness if execution remains disciplined.",
};