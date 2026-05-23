type Props = {
  score: number;
};

function ScoreBar({
  score,
}: Props) {

  const getBarColor = () => {

    if (score >= 80) {
      return "bg-green-500";
    }

    if (score >= 60) {
      return "bg-yellow-500";
    }

    if (score >= 40) {
      return "bg-orange-500";
    }

    return "bg-red-500";
  };

  const getLabel = () => {

    if (score >= 85) {
      return "Excellent";
    }

    if (score >= 70) {
      return "Strong";
    }

    if (score >= 55) {
      return "Average";
    }

    if (score >= 40) {
      return "Weak";
    }

    return "High Risk";
  };

  return (

    <div className="space-y-3">

      {/* LABELS */}
      <div className="flex items-center justify-between">

        <span className="text-sm text-slate-400">

          Performance Score

        </span>

        <span
          className={`
            text-sm
            font-semibold

            ${
              score >= 80
                ? "text-green-400"
                : score >= 60
                ? "text-yellow-400"
                : score >= 40
                ? "text-orange-400"
                : "text-red-400"
            }
          `}
        >
          {getLabel()}
        </span>

      </div>

      {/* BAR CONTAINER */}
      <div className="w-full h-4 bg-slate-800 rounded-full overflow-hidden">

        {/* PROGRESS */}
        <div
          className={`
            h-full
            rounded-full
            transition-all
            duration-1000
            ease-out

            ${getBarColor()}
          `}
          style={{
            width: `${score}%`,
          }}
        />

      </div>

      {/* FOOTER */}
      <div className="flex justify-between text-xs text-slate-500">

        <span>0</span>

        <span>50</span>

        <span>100</span>

      </div>

    </div>
  );
}

export default ScoreBar;