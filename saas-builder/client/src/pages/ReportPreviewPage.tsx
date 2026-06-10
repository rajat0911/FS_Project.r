import { mockReport } from "../mock/mockReport";
import { useNavigate } from "react-router-dom";

function ReportPreviewPage() {
  const navigate = useNavigate();

  return (

    <div className="min-h-screen bg-slate-950 text-white p-8">
      <div className="max-w-7xl mx-auto ">
      <div className="mb-8">
        <button onClick={() => navigate("/")}
          className=" px-5 py-3 rounded-2xl border border-slate-700 hover:border-cyan-500/30 hover:bg-slate-900 transition cursor-pointer" >
          ← Back Home
        </button>
      </div>
        {/* COVER */}

        <div className=" bg-gradient-to-br from-cyan-500/10 via-slate-900 to-slate-950 border border-cyan-500/20 rounded-[32px] p-10 mb-8 " >

          <div className="flex items-start justify-between">
            <div>

              <p className="text-cyan-400 uppercase tracking-[0.2em] text-sm mb-4"> Startup Evaluation Report </p>
              <h1 className="text-5xl font-bold mb-4"> AI SaaS Opportunity Assessment </h1>

              <p className="text-slate-400 max-w-2xl leading-8">
                Investor-grade startup analysis generated
                by SparkAI based on founder inputs,
                market assumptions, and business viability indicators.
              </p>
            </div>

            <div className=" bg-slate-900/60 border border-slate-800 rounded-3xl px-8 py-6 min-w-[220px] " >

              <p className="text-slate-500 text-sm mb-2"> Assessment Status </p>

              <h3 className="text-2xl font-bold text-cyan-400"> High Potential </h3>
              <p className="text-slate-400 mt-3 text-sm leading-6">
                Strong market opportunity with
                scalable business characteristics.
              </p>

            </div>

          </div>

        </div>

        {/* EXECUTIVE SUMMARY */}

        <div className=" bg-slate-900 border border-slate-800 rounded-[32px] p-10 " >

          <h2 className=" text-3xl font-bold mb-6 " > Executive Summary </h2>
          <p className=" text-slate-300 leading-9 text-lg " > {mockReport.overall_summary} </p>
        </div>
      </div>
      {/* STARTUP SNAPSHOT */}

      <div className=" bg-slate-900 border border-slate-800 rounded-[32px] p-10 mt-8 " >

        <h2 className=" text-3xl font-bold mb-8 " > Startup Snapshot </h2>

        <div className=" grid md:grid-cols-2 lg:grid-cols-3 gap-5 " >
          <SnapshotCard
            label="Market Size"
            value={mockReport.startup_projection.estimated_market_size}
          />

          <SnapshotCard
            label="Market Growth"
            value={mockReport.startup_projection.market_growth_rate}
          />

          <SnapshotCard
            label="Projected Revenue"
            value={mockReport.startup_projection.projected_yearly_revenue}
          />

          <SnapshotCard
            label="Break-even Time"
            value={mockReport.startup_projection.estimated_break_even_time}
          />

          <SnapshotCard
            label="Success Probability"
            value={mockReport.startup_projection.startup_success_probability}
          />

          <SnapshotCard
            label="Investor Interest"
            value={`${mockReport.startup_projection.investor_interest_score}/10`}
          />

        </div>
      </div>

      {/* STRENGTHS & RISKS */}

      <div className=" grid lg:grid-cols-2 gap-8 mt-8 " >

        {/* STRENGTHS */}

        <div className=" bg-slate-900 border border-green-500/10 rounded-[32px] p-10 " >

          <h2 className=" text-3xl font-bold text-green-400 mb-8 " > Key Strengths </h2>
          <div className="space-y-5">

            {mockReport.startup_strengths.map(
              (strength, index) => (

                <div key={index} className=" flex items-start gap-4 " >

                  <div className=" h-8 w-8 rounded-full bg-green-500/10 flex items-center justify-center text-green-400 " > ✓ </div>

                  <p className=" text-slate-300 leading-7 " > {strength} </p>
                </div>
              )
            )}

          </div>

        </div>

        {/* RISKS */}

        <div className=" bg-slate-900 border border-red-500/10 rounded-[32px] p-10 " >

          <h2 className=" text-3xl font-bold text-red-400 mb-8 " > Key Risks </h2>

          <div className="space-y-5">
            {mockReport.startup_risks.map(
              (risk, index) => (

                <div key={index} className=" flex items-start gap-4 " >
                  <div className=" h-8 w-8 rounded-full bg-red-500/10 flex items-center justify-center text-red-400 " > ! </div>
                  <p className=" text-slate-300 leading-7 " > {risk} </p>
                </div>
              )
            )}

          </div>

        </div>

        {/* STRATEGIC RECOMMENDATIONS */}

        <div className=" bg-slate-900 border border-yellow-500/10 rounded-[32px] p-12 mt-8 " >

          <h2 className=" text-4xl font-bold text-yellow-400 mb-10 " > Strategic Recommendations </h2>
          <div className="space-y-6">

            {mockReport.strategic_recommendations.map(
              (recommendation, index) => (

                <div key={index} className=" flex gap-6 items-start " >
                  <div
                    className=" min-w-[48px] h-12 w-12 rounded-2xl bg-yellow-500/10 flex items-center justify-center text-yellow-400 font-bold " >
                    {index + 1}
                  </div>

                  <div>
                    <p className=" text-slate-200 leading-8 text-lg " > {recommendation} </p>
                  </div>

                </div>
              )
            )}
          </div>

        </div>

      </div>

    </div>

  );
}
function SnapshotCard({ label, value, }: { label: string; value: string | number; }) {
  return (

    <div className=" bg-slate-950 border border-slate-800 rounded-3xl p-6 hover:border-cyan-500/20 transition " >

      <p className=" text-slate-500 text-sm mb-3 " > {label} </p>
      <p className=" text-2xl font-semibold text-white " > {value} </p>
    </div>
  );
}
export default ReportPreviewPage;