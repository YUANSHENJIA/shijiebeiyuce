import { useMatchStore } from '@/store/useMatchStore';
import { cn } from '@/lib/utils';

interface TeamBadgeProps {
  teamId: string;
  size?: 'sm' | 'md' | 'lg';
}

const sizeConfig = {
  sm: { flag: 'text-2xl', name: 'text-xs', rank: 'text-[9px] px-1.5 py-0.5', container: 'p-2' },
  md: { flag: 'text-4xl', name: 'text-sm', rank: 'text-[10px] px-2 py-0.5', container: 'p-3' },
  lg: { flag: 'text-6xl', name: 'text-lg', rank: 'text-xs px-2.5 py-1', container: 'p-4' },
};

export default function TeamBadge({ teamId, size = 'md' }: TeamBadgeProps) {
  const getTeamById = useMatchStore((s) => s.getTeamById);
  const team = getTeamById(teamId);
  const cfg = sizeConfig[size];

  if (!team) {
    return (
      <div className={cn('flex flex-col items-center gap-1 rounded-lg bg-wc-surface/50', cfg.container)}>
        <span className={cfg.flag}>🏳️</span>
        <span className={cn('font-medium text-wc-muted', cfg.name)}>{teamId}</span>
      </div>
    );
  }

  return (
    <div className={cn('flex flex-col items-center gap-1 rounded-lg bg-wc-surface/50', cfg.container)}>
      <span className={cfg.flag}>{team.flag}</span>
      <span className={cn('font-heading font-semibold text-white', cfg.name)}>
        {team.name}
      </span>
      <span
        className={cn(
          'rounded-full font-heading font-bold bg-wc-gold/20 text-wc-gold',
          cfg.rank
        )}
      >
        FIFA #{team.fifaRank}
      </span>
    </div>
  );
}
