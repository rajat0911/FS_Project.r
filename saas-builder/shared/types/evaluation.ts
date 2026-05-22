export type ScoreMetric = {
  score: number;
  reason: string;
};

export type EvaluationReport = {

  overall_score: number;

  overall_summary: string;

  market_potential: ScoreMetric;

  monetization_potential: ScoreMetric;

  technical_feasibility: ScoreMetric;

  competition_risk: ScoreMetric;

  target_audience_insights: ScoreMetric;

  launch_region_analysis: ScoreMetric;

  strengths: string[];

  risks: string[];

  recommendations: string[];

  final_verdict: string;
};