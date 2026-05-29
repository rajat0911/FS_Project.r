import type {
  EvaluationReport,
} from "../../../shared/types/evaluation";

import MetricCard
  from "./MetricCard";

type Props = {
  report: EvaluationReport;
};

function EvaluationDashboard({
  report,
}: Props) {

  return (

    <div id="saas-report-dashboard" className="space-y-8 max-w-7xl mx-auto bg-slate-950 min-h-screen p-6">

      {/* HERO */}
      <div className="bg-gradient-to-br from-green-500/10 to-slate-900 border border-green-500/20 rounded-3xl p-10">
        <h1 className="text-5xl font-bold text-white mb-6">
          📊 SaaS Evaluation Dashboard
        </h1>

        <div className="flex items-end gap-4 mb-6">
          <div className="text-7xl font-bold text-green-400">
            {report.overall_score.toFixed(1)}
          </div>

          <div className="text-2xl text-slate-400 mb-2">
            /10
          </div>

        </div>
        <p className="text-slate-300 text-lg leading-9">
          {report.overall_summary}
        </p>

      </div>

      {/* STARTUP PROJECTION */}
      <div className=" bg-slate-950 border border-slate-800 rounded-3xl p-8 overflow-hidden " >

        <h2 className="text-3xl font-bold text-white mb-8">
          📈 Startup Projection Analytics
        </h2>

        <div className=" grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 " >

          <ProjectionCard title="Market Size" value={report.startup_projection.estimated_market_size} emoji="🌍" />

          <ProjectionCard title="Market Growth" value={report.startup_projection.market_growth_rate} emoji="📊" />

          <ProjectionCard title="Yearly Revenue" value={report.startup_projection.projected_yearly_revenue} emoji="💰" />

          <ProjectionCard title="Monthly Revenue" value={report.startup_projection.projected_monthly_revenue} emoji="💵" />

          <ProjectionCard title="Break Even" value={report.startup_projection.estimated_break_even_time} emoji="⏳" />

          <ProjectionCard title="CAC" value={report.startup_projection.customer_acquisition_cost} emoji="🎯" />

          <ProjectionCard title="Estimated LTV" value={report.startup_projection.estimated_ltv} emoji="👥" />

          <ProjectionCard title="Success Probability" value={report.startup_projection.startup_success_probability} emoji="🚀" />

          <ProjectionCard title="Investor Score" value={`${report.startup_projection.investor_interest_score}/10`} emoji="💎" />

          <ProjectionCard title="Scalability" value={`${report.startup_projection.scalability_rating}/10`} emoji="📈" />

          <ProjectionCard title="Execution Difficulty" value={report.startup_projection.execution_difficulty} emoji="🛠" />

          <ProjectionCard title="Competition" value={report.startup_projection.competition_level} emoji="⚔️" />

        </div>
      </div>

      {/* METRIC CARDS */}
      <div className="space-y-8"> <MetricCard title="Market Potential" emoji="🌍" metric={report.market_potential} />

        <MetricCard title="Audience Analysis" emoji="🎯" metric={report.audience_analysis} />

        <MetricCard title="Tech Stack Analysis" emoji="🛠" metric={report.tech_stack_analysis} />

        <MetricCard title="Budget Analysis" emoji="💰" metric={report.budget_analysis} />

        <MetricCard title="Location Analysis" emoji="📍" metric={report.location_analysis} />

        <MetricCard title="Monetization Analysis" emoji="💸" metric={report.monetization_analysis} />

        <MetricCard title="Competition Analysis" emoji="⚔️" metric={report.competition_analysis} />

      </div>

      {/* STRENGTHS */}
      <div className="bg-green-500/5 border border-green-500/10 rounded-3xl p-8">

        <h2 className="text-3xl font-bold text-green-400 mb-6"> ✅ Startup Strengths </h2>

        <div className="space-y-4">

          {report.startup_strengths.map((item, index) => (
            <div key={index} className="bg-slate-900 rounded-2xl p-5" >
              <p className="text-slate-300 leading-7"> {item} </p>
            </div>

          )
          )}

        </div>

      </div>

      {/* RISKS */}
      <div className="bg-red-500/5 border border-red-500/10 rounded-3xl p-8">

        <h2 className="text-3xl font-bold text-red-400 mb-6"> ⚠️ Startup Risks </h2>
        <div className="space-y-4">
          {report.startup_risks.map((item, index) => (
            < div key={index} className="bg-slate-900 rounded-2xl p-5" >
              <p className="text-slate-300 leading-7"> {item} </p>
            </div>
          )
          )}
        </div>
      </div>

      {/* RECOMMENDATIONS */}
      <div className="bg-yellow-500/5 border border-yellow-500/10 rounded-3xl p-8">

        <h2 className="text-3xl font-bold text-yellow-400 mb-6">
          🚀 Strategic Recommendations
        </h2>

        <div className="space-y-4">

          {report.strategic_recommendations.map(
            (
              item, index) => (
              <div
                key={index} className="bg-slate-900 rounded-2xl p-5" >

                <p className="text-slate-300 leading-7">
                  {item}
                </p>
              </div>
            )
          )}
        </div>
      </div>

      {/* FINAL VERDICT */}
      <div className="bg-gradient-to-br from-purple-500/10 to-slate-900 border border-purple-500/20 rounded-3xl p-10">

        <h2 className="text-4xl font-bold text-purple-400 mb-6"> 🧠 Final Verdict </h2>

        <p className="text-slate-300 text-lg leading-9">
          {report.final_verdict}
        </p>
      </div>
    </div>
  );
}

function ProjectionCard({
  title, value, emoji, }:
  { title: string; value: string | number; emoji: string; }) {

  return (
    <div
      className="
        bg-slate-900 border border-slate-800 rounded-2xl px-4 py-4 overflow-hidden hover:border-cyan-500/30 transition-all ">

      <div
        className=" text-xs uppercase tracking-wide text-slate-500 mb-2 flex items-center gap-2 " >

        <span>{emoji}</span>
        <span className="truncate">
          {title}
        </span>
      </div>

      <div
        className=" text-lg font-semibold text-white leading-6 break-words whitespace-pre-wrap " >
        {value}

      </div>
    </div>

  );
}

export default EvaluationDashboard;