interface PredictionBarProps {
  homePercent: number;
  drawPercent: number;
  awayPercent: number;
}

export default function PredictionBar({ homePercent, drawPercent, awayPercent }: PredictionBarProps) {
  return (
    <div className="space-y-1">
      <div className="flex h-2 rounded-full overflow-hidden bg-wc-dark">
        <div
          className="bg-wc-accent transition-all duration-700 ease-out"
          style={{ width: `${homePercent}%` }}
        />
        <div
          className="bg-gray-500 transition-all duration-700 ease-out"
          style={{ width: `${drawPercent}%` }}
        />
        <div
          className="bg-wc-red transition-all duration-700 ease-out"
          style={{ width: `${awayPercent}%` }}
        />
      </div>
      <div className="flex justify-between text-[10px] font-medium">
        <span className="text-wc-accent">主胜 {homePercent}%</span>
        <span className="text-gray-400">平 {drawPercent}%</span>
        <span className="text-wc-red">客胜 {awayPercent}%</span>
      </div>
    </div>
  );
}
