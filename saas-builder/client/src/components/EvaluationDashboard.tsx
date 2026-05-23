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

    <div className="space-y-8">

      {/* HERO */}
      <div className="bg-gradient-to-br from-green-500/10 to-slate-900 border border-green-500/20 rounded-3xl p-10">

        <h1 className="text-5xl font-bold text-white mb-6">

          📊 SaaS Evaluation Dashboard

        </h1>

        <div className="flex items-end gap-4 mb-6">

          <div className="text-7xl font-bold text-green-400">

            {report.overall_score}

          </div>

          <div className="text-2xl text-slate-400 mb-2">

            /100

          </div>

        </div>

        <p className="text-slate-300 text-lg leading-9">

          {report.overall_summary}

        </p>

      </div>

      {/* METRIC CARDS */}
      <div className="space-y-8">

        <MetricCard
          title="Market Potential"
          emoji="🌍"
          metric={report.market_potential}
        />

        <MetricCard
          title="Audience Analysis"
          emoji="🎯"
          metric={report.audience_analysis}
        />

        <MetricCard
          title="Tech Stack Analysis"
          emoji="🛠"
          metric={report.tech_stack_analysis}
        />

        <MetricCard
          title="Budget Analysis"
          emoji="💰"
          metric={report.budget_analysis}
        />

        <MetricCard
          title="Location Analysis"
          emoji="📍"
          metric={report.location_analysis}
        />

        <MetricCard
          title="Monetization Analysis"
          emoji="💸"
          metric={report.monetization_analysis}
        />

        <MetricCard
          title="Competition Analysis"
          emoji="⚔️"
          metric={report.competition_analysis}
        />

      </div>

      {/* STRENGTHS */}
      <div className="bg-green-500/5 border border-green-500/10 rounded-3xl p-8">

        <h2 className="text-3xl font-bold text-green-400 mb-6">

          ✅ Startup Strengths

        </h2>

        <div className="space-y-4">

          {report.startup_strengths.map(
            (
              item,
              index
            ) => (

              <div
                key={index}
                className="bg-slate-900 rounded-2xl p-5"
              >

                <p className="text-slate-300 leading-7">

                  {item}

                </p>

              </div>

            )
          )}

        </div>

      </div>

      {/* RISKS */}
      <div className="bg-red-500/5 border border-red-500/10 rounded-3xl p-8">

        <h2 className="text-3xl font-bold text-red-400 mb-6">

          ⚠️ Startup Risks

        </h2>

        <div className="space-y-4">

          {report.startup_risks.map(
            (
              item,
              index
            ) => (

              <div
                key={index}
                className="bg-slate-900 rounded-2xl p-5"
              >

                <p className="text-slate-300 leading-7">

                  {item}

                </p>

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
              item,
              index
            ) => (

              <div
                key={index}
                className="bg-slate-900 rounded-2xl p-5"
              >

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

        <h2 className="text-4xl font-bold text-purple-400 mb-6">

          🧠 Final Verdict

        </h2>

        <p className="text-slate-300 text-lg leading-9">

          {report.final_verdict}

        </p>

      </div>

    </div>
  );
}

export default EvaluationDashboard;