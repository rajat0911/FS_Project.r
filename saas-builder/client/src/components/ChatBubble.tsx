import type { Message }
from "../../../shared/types/message";

import type {
  EvaluationReport,
}
from "../../../shared/types/evaluation";

import ReactMarkdown
from "react-markdown";

import remarkGfm
from "remark-gfm";

type Props = {
  message: Message;
};

function ScoreBar({
  score,
}: {
  score: number;
}) {

  return (

    <div className="w-full bg-slate-800 rounded-full h-3 overflow-hidden">

      <div
        className="h-full bg-green-400 rounded-full transition-all duration-500"
        style={{
          width: `${score}%`,
        }}
      />

    </div>
  );
}

function MetricCard({
  title,
  score,
  reason,
}: {
  title: string;
  score: number;
  reason: string;
}) {

  return (

    <div className="bg-slate-800 border border-slate-700 rounded-2xl p-5">

      <div className="flex items-center justify-between mb-3">

        <h3 className="font-semibold text-lg">

          {title}

        </h3>

        <span className="text-green-400 font-bold">

          {score}/100

        </span>
      </div>

      <ScoreBar score={score} />

      <p className="text-slate-300 mt-4 leading-7">

        {reason}

      </p>

    </div>
  );
}

function Dashboard({
  report,
}: {
  report: EvaluationReport;
}) {

  return (

    <div className="space-y-8">

      {/* OVERALL SCORE */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 rounded-3xl p-8">

        <h1 className="text-3xl font-bold mb-4">

          🚀 SaaS Evaluation Dashboard

        </h1>

        <div className="flex items-center gap-6 mb-5">

          <div className="text-6xl font-bold text-green-400">

            {report.overall_score}

          </div>

          <div>

            <p className="text-slate-400">

              Overall Startup Score

            </p>

            <div className="w-72 mt-2">
              <ScoreBar
                score={
                  report.overall_score
                }
              />
            </div>

          </div>
        </div>

        <p className="text-slate-300 leading-8 text-lg">

          {report.overall_summary}

        </p>
      </div>

      {/* METRICS */}
      <div className="grid md:grid-cols-2 gap-5">

        <MetricCard
          title="🌍 Market Potential"
          score={
            report.market_potential.score
          }
          reason={
            report.market_potential.reason
          }
        />

        <MetricCard
          title="💰 Monetization"
          score={
            report.monetization_potential.score
          }
          reason={
            report.monetization_potential.reason
          }
        />

        <MetricCard
          title="🛠 Technical Feasibility"
          score={
            report.technical_feasibility.score
          }
          reason={
            report.technical_feasibility.reason
          }
        />

        <MetricCard
          title="⚠️ Competition Risk"
          score={
            report.competition_risk.score
          }
          reason={
            report.competition_risk.reason
          }
        />

      </div>

      {/* STRENGTHS */}
      <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6">

        <h2 className="text-2xl font-bold mb-5">

          ✅ Strengths

        </h2>

        <ul className="space-y-3">

          {report.strengths.map(
            (
              item,
              index
            ) => (

              <li
                key={index}
                className="text-slate-300"
              >

                • {item}

              </li>
            )
          )}

        </ul>
      </div>

      {/* RISKS */}
      <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6">

        <h2 className="text-2xl font-bold mb-5">

          ⚠️ Risks

        </h2>

        <ul className="space-y-3">

          {report.risks.map(
            (
              item,
              index
            ) => (

              <li
                key={index}
                className="text-slate-300"
              >

                • {item}

              </li>
            )
          )}

        </ul>
      </div>

      {/* RECOMMENDATIONS */}
      <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6">

        <h2 className="text-2xl font-bold mb-5">

          🚀 Recommendations

        </h2>

        <ul className="space-y-3">

          {report.recommendations.map(
            (
              item,
              index
            ) => (

              <li
                key={index}
                className="text-slate-300"
              >

                • {item}

              </li>
            )
          )}

        </ul>
      </div>

      {/* FINAL VERDICT */}
      <div className="bg-green-500/10 border border-green-500/30 rounded-3xl p-8">

        <h2 className="text-3xl font-bold mb-5 text-green-400">

          🧠 Final Verdict

        </h2>

        <p className="text-lg leading-8 text-slate-200">

          {report.final_verdict}

        </p>

      </div>

    </div>
  );
}

function ChatBubble({
  message,
}: Props) {

  const isUser =
    message.role === "user";

  const isEvaluation =
    typeof message.content ===
    "object";

  return (

    <div
      className={`flex animate-fade-in ${
        isUser
          ? "justify-end"
          : "justify-start"
      }`}
    >

      <div
        className={`max-w-5xl w-full px-6 py-5 rounded-3xl shadow-lg ${
          isUser
            ? "bg-white text-black"
            : "bg-slate-900 border border-slate-800 text-white"
        }`}
      >

        {/* HEADER */}
        <div className="flex items-center justify-between mb-5">

          <div className="flex items-center gap-3">

            <div
              className={`w-3 h-3 rounded-full ${
                isUser
                  ? "bg-black"
                  : "bg-green-400 animate-pulse"
              }`}
            />

            <p className="text-sm font-semibold tracking-wide opacity-90">

              {isUser
                ? "You"
                : "AI SaaS Consultant"}

            </p>
          </div>

          <span className="text-xs text-slate-400">

            {message.timestamp}

          </span>
        </div>

        {/* USER MESSAGE */}
        {typeof message.content ===
          "string" && (

          <div className="prose prose-invert max-w-none">

            <ReactMarkdown
              remarkPlugins={[
                remarkGfm,
              ]}
            >

              {message.content}

            </ReactMarkdown>

          </div>
        )}

        {/* AI DASHBOARD */}
        {isEvaluation && (

          <Dashboard
            report={
              message.content as EvaluationReport
            }
          />

        )}

      </div>

    </div>
  );
}

export default ChatBubble;