export type DetailedMetric = {
  score: number;

  reason: string;

  advantages: string[];

  risks: string[];

  improvement_suggestions: string[];

  business_impact: string;

  optimization_potential: string;

  market_effect: string;

  scalability_effect: string;

  investor_perspective: string;

  recommended_changes: string[];
};

export type EvaluationReport = {

  overall_score: number;

  overall_summary: string;

  market_potential: DetailedMetric;

  audience_analysis: DetailedMetric;

  tech_stack_analysis: DetailedMetric;

  budget_analysis: DetailedMetric;

  location_analysis: DetailedMetric;

  monetization_analysis: DetailedMetric;

  competition_analysis: DetailedMetric;

  final_verdict: string;

  startup_strengths: string[];

  startup_risks: string[];

  strategic_recommendations: string[];
};