export type ParsedMetric = {
  title: string;
  score: number;
  description: string;
  emoji: string;
};

export function parseReport(
  content: string
): ParsedMetric[] {

  const metrics: ParsedMetric[] = [];

  const regex =
    /##\s(.+?)\nScore:\s(\d+)\n([\s\S]*?)(?=\n---|\n##|$)/g;

  let match;

  while (
    (match = regex.exec(content))
    !== null
  ) {

    const rawTitle =
      match[1].trim();

    const score =
      Number(match[2]);

    const description =
      match[3].trim();

    const emojiMatch =
      rawTitle.match(
        /^(\p{Emoji_Presentation}|\p{Emoji}\uFE0F)/u
      );

    const emoji =
      emojiMatch?.[0] || "📊";

    const title =
      rawTitle.replace(
        emoji,
        ""
      ).trim();

    metrics.push({
      title,
      score,
      description,
      emoji,
    });
  }

  return metrics;
}