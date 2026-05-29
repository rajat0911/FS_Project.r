export type MetricDetails = {
  score: number;

  reason: string;

  advantages: string[];

  risks: string[];

  improvement_suggestions: string[];

  business_impact: string;

  optimization_potential: string;

  growth_if_optimized: string;

  growth_without_changes: string;

  revenue_impact: string;

  user_retention_impact: string;

  conversion_rate_impact: string;

  estimated_business_boost: string;

  market_effect: string;

  scalability_effect: string;

  investor_perspective: string;

  recommended_changes: string[];

  recommended_frontend: string;

  recommended_backend: string;

  recommended_ai_model: string;

  recommended_database: string;

  recommended_hosting: string;

  estimated_monthly_cost: string;

  cost_reduction_potential: string;

  scalability_score: number;
};

export type StartupProjection = {
  estimated_market_size: string;

  market_growth_rate: string;

  projected_yearly_revenue: string;

  projected_monthly_revenue: string;

  estimated_break_even_time: string;

  customer_acquisition_cost: string;

  estimated_ltv: string;

  startup_success_probability: string;

  investor_interest_score: number;

  scalability_rating: number;

  execution_difficulty: string;

  competition_level: string;

  growth_potential: string;

  profitability_potential: string;
};

export type EvaluationReport = {

  overall_score: number;

  overall_summary: string;

  startup_projection: StartupProjection;

  market_potential: MetricDetails;

  audience_analysis: MetricDetails;

  tech_stack_analysis: MetricDetails;

  budget_analysis: MetricDetails;

  location_analysis: MetricDetails;

  monetization_analysis: MetricDetails;

  competition_analysis: MetricDetails;

  final_verdict: string;

  startup_strengths: string[];

  startup_risks: string[];

  strategic_recommendations: string[];
};