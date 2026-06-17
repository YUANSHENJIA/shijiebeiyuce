import { useNavigate } from 'react-router-dom';
import { useMatchStore } from '@/store/useMatchStore';
import { usePredictStore } from '@/store/usePredictStore';
import { cn } from '@/lib/utils';
import StageBadge from './StageBadge';
import PredictionBar from './PredictionBar';

interface MatchCardProps {
  matchId: string;
  compact?: boolean;
}

export default function MatchCard({ matchId, compact = false }: MatchCardProps) {
  const navigate = useNavigate();
  const getMatchById = useMatchStore((s) => s.getMatchById);
  const getTeamById = useMatchStore((s) => s.getTeamById);
  const getPredictionByMatchId = usePredictStore((s) => s.getPredictionByMatchId);
  const getPredictionStats = usePredictStore((s) => s.getPredictionStats);

  const match = getMatchById(matchId);
  if (!match) return null;

  const homeTeam = getTeamById(match.homeTeamId);
  const awayTeam = getTeamById(match.awayTeamId);
  const userPrediction = getPredictionByMatchId(matchId);
  const stats = getPredictionStats(matchId);

  const homePercent = stats.total > 0 ? Math.round((stats.home / stats.total) * 100) : 0;
  const drawPercent = stats.total > 0 ? Math.round((stats.draw / stats.total) * 100) : 0;
  const awayPercent = stats.total > 0 ? 100 - homePercent - drawPercent : 0;

  return (
    <div
      onClick={() => navigate(`/match/${matchId}`)}
      className={cn(
        'relative cursor-pointer rounded-xl border border-wc-border bg-wc-surface/60 backdrop-blur-sm transition-all duration-300',
        'hover:scale-[1.02] hover:border-wc-accent/50 hover:shadow-[0_0_15px_rgba(0,230,118,0.15)]',
        compact ? 'p-3' : 'p-4'
      )}
    >
      {/* Stage badge */}
      <div className="mb-2">
        <StageBadge stage={match.stage} />
      </div>

      {/* Teams */}
      <div className="flex items-center justify-between gap-2">
        {/* Home team */}
        <div className="flex-1 flex items-center gap-2 min-w-0">
          <span className={compact ? 'text-xl' : 'text-2xl'}>{homeTeam?.flag ?? '🏳️'}</span>
          <span className={cn('font-medium truncate', compact ? 'text-xs' : 'text-sm')}>
            {homeTeam?.name ?? match.homeTeamId}
          </span>
        </div>

        {/* VS */}
        <div className="flex-shrink-0 px-2">
          <span className={cn('font-heading font-bold text-wc-muted', compact ? 'text-xs' : 'text-sm')}>
            VS
          </span>
        </div>

        {/* Away team */}
        <div className="flex-1 flex items-center gap-2 min-w-0 justify-end">
          <span className={cn('font-medium truncate text-right', compact ? 'text-xs' : 'text-sm')}>
            {awayTeam?.name ?? match.awayTeamId}
          </span>
          <span className={compact ? 'text-xl' : 'text-2xl'}>{awayTeam?.flag ?? '🏳️'}</span>
        </div>
      </div>

      {/* Match info */}
      {!compact && (
        <div className="mt-3 flex items-center gap-3 text-[11px] text-wc-muted">
          <span>{match.date} {match.time}</span>
          <span className="text-wc-border">|</span>
          <span className="truncate">{match.venue}, {match.city}</span>
        </div>
      )}

      {/* Prediction bar */}
      <div className="mt-3">
        <PredictionBar
          homePercent={homePercent}
          drawPercent={drawPercent}
          awayPercent={awayPercent}
        />
      </div>

      {/* User prediction indicator */}
      {userPrediction && (
        <div className="absolute top-2 right-2">
          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-wc-accent/20 text-wc-accent text-[10px] font-medium">
            ✓ 已预测
          </span>
        </div>
      )}
    </div>
  );
}
