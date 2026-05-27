type Props = {
  score: number;
};

function ScoreBar({
  score,
}: Props) {

  // Convert 0-10 → percentage
  const percentage =
    Math.min(score * 10, 100);

  // Dynamic colors
  const getColor = () => {

    if (score >= 8)
      return "bg-green-400";

    if (score >= 6)
      return "bg-yellow-400";

    if (score >= 4)
      return "bg-orange-400";

    return "bg-red-500";
  };

  return (

    <div
      className="
      w-full
      h-3
      bg-slate-800
      rounded-full
      overflow-hidden
    "
    >

      <div
        className={`
          h-full
          transition-all
          duration-700
          rounded-full
          ${getColor()}
        `}
        style={{
          width: `${percentage}%`,
        }}
      />

    </div>
  );
}

export default ScoreBar;