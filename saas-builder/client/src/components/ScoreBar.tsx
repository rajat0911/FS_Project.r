type Props = {
  score: number;
};

function ScoreBar({
  score,
}: Props) {

  const width =
    `${score * 10}%`;

  const getColor = () => {

    if (score >= 8)
      return "bg-green-500";

    if (score >= 5)
      return "bg-yellow-500";

    return "bg-red-500";
  };

  return (

    <div className="w-full">

      <div className="flex justify-between mb-2">

        <span className="text-sm text-slate-300">
          Score
        </span>

        <span className="text-sm font-semibold text-white">
          {score}/10
        </span>

      </div>

      <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden">

        <div
          className={`h-full rounded-full transition-all duration-700 ${getColor()}`}
          style={{
            width,
          }}
        />

      </div>

    </div>
  );
}

export default ScoreBar;