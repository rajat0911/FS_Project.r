import ScoreBar
from "./ScoreBar";

type Props = {
  title: string;
  score: number;
  description: string;
  emoji: string;
};

function MetricCard({
  title,
  score,
  description,
  emoji,
}: Props) {

  return (

    <div
      className="
      bg-slate-900
      border border-slate-800
      rounded-3xl
      p-6
      space-y-4
      shadow-lg
    "
    >

      <div className="flex items-center gap-3">

        <span className="text-3xl">
          {emoji}
        </span>

        <div>

          <h3 className="text-xl font-bold text-white">

            {title}

          </h3>

          <p className="text-slate-400 text-sm">

            AI Evaluation

          </p>

        </div>
      </div>

      <ScoreBar score={score} />

      <p className="text-slate-300 leading-7">

        {description}

      </p>

    </div>
  );
}

export default MetricCard;