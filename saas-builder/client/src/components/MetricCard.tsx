import type {
  DetailedMetric,
} from "../../../shared/types/evaluation";

import ScoreBar
from "./ScoreBar";

type Props = {
  title: string;

  emoji: string;

  metric: DetailedMetric;
};

function MetricCard({
  title,
  emoji,
  metric,
}: Props) {

  return (

    <div className="bg-slate-950 border border-slate-800 rounded-3xl p-8 space-y-8">

      {/* HEADER */}
      <div className="flex items-center justify-between">

        <div>

          <h2 className="text-3xl font-bold text-white flex items-center gap-3">

            <span>{emoji}</span>

            <span>{title}</span>

          </h2>

        </div>

        <div className="text-right">

          <div className="text-5xl font-bold text-green-400">

            {metric.score}

          </div>

          <div className="text-slate-400 text-sm">

            /100

          </div>

        </div>

      </div>

      {/* SCORE BAR */}
      <ScoreBar
        score={metric.score}
      />

      {/* REASON */}
      <div>

        <h3 className="text-xl font-semibold text-white mb-3">

          📌 Analysis

        </h3>

        <p className="text-slate-300 leading-8">

          {metric.reason}

        </p>

      </div>

      {/* ADVANTAGES */}
      {metric.advantages?.length > 0 && (

        <div>

          <h3 className="text-xl font-semibold text-green-400 mb-4">

            ✅ Advantages

          </h3>

          <div className="space-y-3">

            {metric.advantages.map(
              (
                item,
                index
              ) => (

                <div
                  key={index}
                  className="bg-green-500/5 border border-green-500/10 rounded-2xl p-4"
                >

                  <p className="text-slate-300 leading-7">

                    {item}

                  </p>

                </div>

              )
            )}

          </div>

        </div>

      )}

      {/* RISKS */}
      {metric.risks?.length > 0 && (

        <div>

          <h3 className="text-xl font-semibold text-red-400 mb-4">

            ⚠️ Risks

          </h3>

          <div className="space-y-3">

            {metric.risks.map(
              (
                item,
                index
              ) => (

                <div
                  key={index}
                  className="bg-red-500/5 border border-red-500/10 rounded-2xl p-4"
                >

                  <p className="text-slate-300 leading-7">

                    {item}

                  </p>

                </div>

              )
            )}

          </div>

        </div>

      )}

      {/* IMPROVEMENTS */}
      {metric.improvement_suggestions?.length > 0 && (

        <div>

          <h3 className="text-xl font-semibold text-yellow-400 mb-4">

            🚀 Improvement Suggestions

          </h3>

          <div className="space-y-3">

            {metric.improvement_suggestions.map(
              (
                item,
                index
              ) => (

                <div
                  key={index}
                  className="bg-yellow-500/5 border border-yellow-500/10 rounded-2xl p-4"
                >

                  <p className="text-slate-300 leading-7">

                    {item}

                  </p>

                </div>

              )
            )}

          </div>

        </div>

      )}

      {/* BUSINESS IMPACT */}
      {metric.business_impact && (

        <div className="bg-cyan-500/5 border border-cyan-500/10 rounded-2xl p-5">

          <h3 className="text-xl font-semibold text-cyan-400 mb-3">

            📈 Business Impact

          </h3>

          <p className="text-slate-300 leading-8">

            {metric.business_impact}

          </p>

        </div>

      )}

      {/* OPTIMIZATION */}
      {metric.optimization_potential && (

        <div className="bg-blue-500/5 border border-blue-500/10 rounded-2xl p-5">

          <h3 className="text-xl font-semibold text-blue-400 mb-3">

            ⚡ Optimization Potential

          </h3>

          <p className="text-slate-300 leading-8">

            {metric.optimization_potential}

          </p>

        </div>

      )}

      {/* MARKET EFFECT */}
      {metric.market_effect && (

        <div className="bg-purple-500/5 border border-purple-500/10 rounded-2xl p-5">

          <h3 className="text-xl font-semibold text-purple-400 mb-3">

            🌍 Market Effect

          </h3>

          <p className="text-slate-300 leading-8">

            {metric.market_effect}

          </p>

        </div>

      )}

      {/* SCALABILITY */}
      {metric.scalability_effect && (

        <div className="bg-indigo-500/5 border border-indigo-500/10 rounded-2xl p-5">

          <h3 className="text-xl font-semibold text-indigo-400 mb-3">

            📦 Scalability Effect

          </h3>

          <p className="text-slate-300 leading-8">

            {metric.scalability_effect}

          </p>

        </div>

      )}

      {/* INVESTOR VIEW */}
      {metric.investor_perspective && (

        <div className="bg-pink-500/5 border border-pink-500/10 rounded-2xl p-5">

          <h3 className="text-xl font-semibold text-pink-400 mb-3">

            💰 Investor Perspective

          </h3>

          <p className="text-slate-300 leading-8">

            {metric.investor_perspective}

          </p>

        </div>

      )}

      {/* RECOMMENDED CHANGES */}
      {metric.recommended_changes?.length > 0 && (

        <div>

          <h3 className="text-xl font-semibold text-orange-400 mb-4">

            🔥 Recommended Changes

          </h3>

          <div className="space-y-3">

            {metric.recommended_changes.map(
              (
                item,
                index
              ) => (

                <div
                  key={index}
                  className="bg-orange-500/5 border border-orange-500/10 rounded-2xl p-4"
                >

                  <p className="text-slate-300 leading-7">

                    {item}

                  </p>

                </div>

              )
            )}

          </div>

        </div>

      )}

    </div>
  );
}

export default MetricCard;