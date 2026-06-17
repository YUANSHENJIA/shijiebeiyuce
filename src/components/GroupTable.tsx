import { useMatchStore } from '@/store/useMatchStore';
import { cn } from '@/lib/utils';

interface GroupTableProps {
  groupCode: string;
}

export default function GroupTable({ groupCode }: GroupTableProps) {
  const getGroupStandings = useMatchStore((s) => s.getGroupStandings);
  const standings = getGroupStandings(groupCode);

  if (standings.length === 0) return null;

  return (
    <div className="rounded-xl border border-wc-border bg-wc-surface/40 overflow-hidden">
      {/* Header */}
      <div className="px-3 py-2 border-b border-wc-border bg-wc-mid/50">
        <h3 className="font-heading text-sm font-semibold text-wc-accent tracking-wider">
          {groupCode} 组
        </h3>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-[11px]">
          <thead>
            <tr className="text-wc-muted border-b border-wc-border/50">
              <th className="text-left px-2 py-1.5 font-medium">#</th>
              <th className="text-left px-1 py-1.5 font-medium">球队</th>
              <th className="text-center px-1 py-1.5 font-medium">赛</th>
              <th className="text-center px-1 py-1.5 font-medium">胜</th>
              <th className="text-center px-1 py-1.5 font-medium">平</th>
              <th className="text-center px-1 py-1.5 font-medium">负</th>
              <th className="text-center px-1 py-1.5 font-medium">进</th>
              <th className="text-center px-1 py-1.5 font-medium">失</th>
              <th className="text-center px-1 py-1.5 font-medium">净</th>
              <th className="text-center px-1 py-1.5 font-medium">分</th>
            </tr>
          </thead>
          <tbody>
            {standings.map((s, idx) => {
              const isTop2 = idx < 2;
              const is3rd = idx === 2;
              return (
                <tr
                  key={s.teamId}
                  className={cn(
                    'border-b border-wc-border/30 transition-colors',
                    isTop2 && 'bg-wc-accent/8',
                    is3rd && 'bg-yellow-500/5',
                    !isTop2 && !is3rd && 'hover:bg-wc-surface/50'
                  )}
                >
                  <td className="px-2 py-1.5">
                    <span
                      className={cn(
                        'inline-flex items-center justify-center w-4 h-4 rounded-full text-[9px] font-bold',
                        isTop2
                          ? 'bg-wc-accent/20 text-wc-accent'
                          : is3rd
                          ? 'bg-yellow-500/20 text-yellow-400'
                          : 'text-wc-muted'
                      )}
                    >
                      {idx + 1}
                    </span>
                  </td>
                  <td className="px-1 py-1.5">
                    <div className="flex items-center gap-1 min-w-0">
                      <span className="text-sm">{s.team.flag}</span>
                      <span className="truncate font-medium text-white">{s.team.name}</span>
                    </div>
                  </td>
                  <td className="text-center px-1 py-1.5 text-wc-muted">{s.played}</td>
                  <td className="text-center px-1 py-1.5 text-wc-muted">{s.won}</td>
                  <td className="text-center px-1 py-1.5 text-wc-muted">{s.drawn}</td>
                  <td className="text-center px-1 py-1.5 text-wc-muted">{s.lost}</td>
                  <td className="text-center px-1 py-1.5 text-wc-muted">{s.goalsFor}</td>
                  <td className="text-center px-1 py-1.5 text-wc-muted">{s.goalsAgainst}</td>
                  <td className={cn(
                    'text-center px-1 py-1.5 font-medium',
                    s.goalDifference > 0 ? 'text-wc-accent' : s.goalDifference < 0 ? 'text-wc-red' : 'text-wc-muted'
                  )}>
                    {s.goalDifference > 0 ? '+' : ''}{s.goalDifference}
                  </td>
                  <td className="text-center px-1 py-1.5 font-bold text-white">{s.points}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
