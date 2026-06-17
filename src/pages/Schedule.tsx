import { useState, useMemo } from 'react';
import { useMatchStore } from '@/store/useMatchStore';
import MatchCard from '@/components/MatchCard';
import GroupTable from '@/components/GroupTable';
import type { Match } from '@/types';

type StageKey = 'all' | Match['stage'];

const STAGES: { key: StageKey; label: string }[] = [
  { key: 'all', label: '全部' },
  { key: 'group', label: '小组赛' },
  { key: 'r32', label: '32强' },
  { key: 'r16', label: '16强' },
  { key: 'qf', label: '8强' },
  { key: 'sf', label: '半决赛' },
  { key: 'final', label: '决赛' },
];

const GROUP_CODES = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'];

export default function Schedule() {
  const [activeStage, setActiveStage] = useState<StageKey>('all');
  const { matches } = useMatchStore();

  const filteredMatches = useMemo(() => {
    const list = activeStage === 'all' ? matches : matches.filter((m) => m.stage === activeStage);
    return [...list].sort((a, b) => `${a.date}T${a.time}`.localeCompare(`${b.date}T${b.time}`));
  }, [matches, activeStage]);

  const groupedByDate = useMemo(() => {
    const map = new Map<string, Match[]>();
    filteredMatches.forEach((m) => {
      const arr = map.get(m.date) ?? [];
      arr.push(m);
      map.set(m.date, arr);
    });
    return map;
  }, [filteredMatches]);

  const showGroups = activeStage === 'all' || activeStage === 'group';

  return (
    <div className="min-h-screen bg-[#0A1F1C] text-white pb-12">
      {/* Header */}
      <div className="px-4 pt-6 pb-4">
        <h1 className="text-2xl font-bold">赛程</h1>
        <p className="text-gray-400 text-sm mt-1">共 {matches.length} 场比赛</p>
      </div>

      {/* Stage tabs */}
      <div className="px-4 mb-6">
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {STAGES.map((s) => (
            <button
              key={s.key}
              onClick={() => setActiveStage(s.key)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                activeStage === s.key
                  ? 'bg-[#00E676] text-[#0A1F1C]'
                  : 'bg-[#0D2B26] text-gray-400 hover:text-white border border-white/10'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* Group standings */}
      {showGroups && (
        <section className="px-4 mb-8">
          <h2 className="text-lg font-bold mb-3 flex items-center gap-2">
            <span className="w-1 h-5 bg-[#00E676] rounded-full" />
            小组积分榜
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
            {GROUP_CODES.map((code) => (
              <GroupTable key={code} groupCode={code} />
            ))}
          </div>
        </section>
      )}

      {/* Match list */}
      <section className="px-4">
        <h2 className="text-lg font-bold mb-3 flex items-center gap-2">
          <span className="w-1 h-5 bg-[#FFD700] rounded-full" />
          比赛列表
        </h2>

        {groupedByDate.size === 0 ? (
          <div className="text-center py-16 text-gray-500">
            <p className="text-4xl mb-3">⚽</p>
            <p>暂无该阶段比赛</p>
          </div>
        ) : (
          <div className="space-y-6">
            {[...groupedByDate.entries()].map(([date, dateMatches]) => (
              <div key={date}>
                <div className="flex items-center gap-3 mb-3">
                  <h3 className="text-sm font-semibold text-[#00E676]">{date}</h3>
                  <span className="text-xs text-gray-500">{dateMatches.length} 场</span>
                  <div className="flex-1 h-px bg-white/5" />
                </div>
                <div className="space-y-3">
                  {dateMatches.map((m) => (
                    <MatchCard key={m.id} matchId={m.id} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
