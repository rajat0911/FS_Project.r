import type {
  MetricDetails,
} from "../../../shared/types/evaluation";

import ScoreBar from "./ScoreBar";

import {
  Bar,
  Pie,
  Line,
  Radar,
} from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  PointElement,
  LineElement,
  RadialLinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  PointElement,
  LineElement,
  RadialLinearScale,
  Tooltip,
  Legend
);

const radarOptions = {
  responsive: true,

  maintainAspectRatio: false,

  plugins: { legend: { labels: { color: "#cbd5e1", font: { size: 14, }, }, }, },

  scales: {
    r: {
      angleLines: { color: "#1e293b", },

      grid: { color: "#1e293b", },
      pointLabels: { color: "#cbd5e1", },

      ticks: { color: "#94a3b8", backdropColor: "transparent", },
    },
  },
};

type Props = { title: string; emoji: string; metric: MetricDetails; };

const chartOptions = {
  responsive: true, maintainAspectRatio: false,

  plugins: { legend: { labels: { color: "#cbd5e1", font: { size: 14, }, }, }, },

  scales: {
    r: {
      angleLines: { color: "#1e293b", },

      grid: { color: "#1e293b", },
      pointLabels: { color: "#cbd5e1", },

      ticks: { color: "#94a3b8", backdropColor: "transparent", },
    },
  },
};

function MiniTechCard({ label, value, }: { label: string; value: string; }) {

  return (
    <div className=" bg-slate-900 border border-slate-800 rounded-2xl p-4 " >

      <p className=" text-xs text-slate-500 " >
        {label}
      </p>

      <p className=" text-white font-semibold mt-2 break-words text-sm " >
        {value}
      </p>
    </div>
  );
}

function MetricCard({ title, emoji, metric, }: Props) {

  const extractNumber = (
    value: string) => {
      const match = value.match(/\d+/);
    return match ? Number(match[0]) : 0;
  };

  const growth = extractNumber(metric.growth_if_optimized);

  const revenue = extractNumber(metric.revenue_impact);

  const retention = extractNumber(metric.user_retention_impact);

  const conversion = extractNumber(metric.conversion_rate_impact);

  const labels = [
    "Growth",
    "Revenue",
    "Retention",
    "Conversion",
  ];

  const values = [
    growth,
    revenue,
    retention,
    conversion,
  ];

  const isTechCard = title === "Tech Stack Analysis";

  return (

    <div className=" bg-slate-950 border border-slate-800 rounded-3xl p-6 space-y-6 overflow-hidden " >

      {/* HEADER */}
      <div className="flex items-center justify-between">

        <h2 className="text-2xl font-bold text-white">
          {emoji} {title}
        </h2>

        <div className="text-right">

          <div className="text-4xl font-bold text-green-400">
            {metric.score.toFixed(1)}
          </div>

          <div className="text-slate-500 text-sm">
            /10
          </div>

        </div>
      </div>

      {/* SCORE BAR */}
      <ScoreBar score={metric.score} />

      {/* TECH CARD */}
      {isTechCard ? (
        <div className=" grid grid-cols-2 md:grid-cols-4 gap-4 " >

          <MiniTechCard label="Frontend" value={metric.recommended_frontend} />

          <MiniTechCard label="Backend" value={metric.recommended_backend} />

          <MiniTechCard label="AI Model" value={metric.recommended_ai_model} />
          <MiniTechCard label="Database" value={metric.recommended_database} />

          <MiniTechCard label="Hosting" value={metric.recommended_hosting} />
          <MiniTechCard label="Infra Cost" value={metric.estimated_monthly_cost} />

          <MiniTechCard label="Cost Saving" value={metric.cost_reduction_potential} />

          <MiniTechCard label="Scalability" value={`${metric.scalability_score}/10`} />
        </div>
      ) :
        (<div className=" grid grid-cols-2 gap-4 " >
          <KPI label="📈 Growth" value={metric.growth_if_optimized} />

          <KPI label="💰 Revenue" value={metric.revenue_impact} />

          <KPI label="👥 Retention" value={metric.user_retention_impact} />
          <KPI label="🚀 Conversion" value={metric.conversion_rate_impact} />
        </div>

        )}

      {/* CHART AREA */}
      <div className=" h-72 bg-slate-900 border border-slate-800 rounded-3xl p-4 " >

        {/* MARKET */}
        {title === "Market Potential" && (

          <Line
            data={{
              labels,
              datasets: [
                {
                  label: "Market Growth",
                  data: values, borderColor: "#4ade80",
                  backgroundColor: "rgba(74, 222, 128, 0.2)",
                  borderWidth: 4, tension: 0.4, fill: true, pointRadius: 5,
                  pointBackgroundColor: "#4ade80",
                },],
            }}
            options={chartOptions}
          />
        )}

        {/* AUDIENCE */}
        {title === "Audience Analysis" && (

          <Pie
            data={{
              labels,
              datasets: [{ data: values, backgroundColor: ["#4ade80", "#38bdf8", "#c084fc", "#f59e0b",], borderWidth: 0, },],
            }}
            options={chartOptions}
          />
        )}

        {/* COMPETITION */}
        {title === "Competition Analysis" && (

          <Radar
            data={{
              labels,
              datasets: [{
                label: "Competitive Strength", data: values,
                backgroundColor: "rgba(56, 189, 248, 0.2)", borderColor: "#38bdf8",
                borderWidth: 3, pointBackgroundColor: "#38bdf8",
              },],
            }}
            options={radarOptions}
          />
        )}

        {/* DEFAULT */}
        {title !== "Market Potential" &&
          title !== "Audience Analysis" &&
          title !== "Competition Analysis" && (

            <Bar
              data={{
                labels,
                datasets: [{
                  label: "Business Metrics", data: values,
                  backgroundColor: ["#4ade80", "#38bdf8", "#c084fc", "#f59e0b",], borderRadius: 12,
                },],
              }}
              options={chartOptions}
            />
          )}

      </div>
    </div>
  );
}

/* KPI */

function KPI({ label, value, }: { label: string; value: string; }) {
  return (

    <div className=" bg-slate-900 border border-slate-800 rounded-2xl px-4 py-3 " >

      <div className="text-xs text-slate-400">
        {label}
      </div>

      <div className=" text-xl font-bold text-white mt-1 " >
        {value}
      </div>

    </div>
  );
}

export default MetricCard;