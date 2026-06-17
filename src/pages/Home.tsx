import { useNavigate } from 'react-router-dom';
import { Calendar, TrendingUp, Trophy } from 'lucide-react';
import Countdown from '@/components/Countdown';
import MatchCard from '@/components/MatchCard';
import { useMatchStore } from '@/store/useMatchStore';
import { usePredictStore } from '@/store/usePredictStore';

export default function Home() {
  const navigate = useNavigate();
  const { matches } = useMatchStore();
  const { predictions, getPredictionStats } = usePredictStore();

  const upcomingMatches = [...matches]
    .sort((a, b) => `${a.date}T${a.time}`.localeCompare(`${b.date}T${b.time}`))
    .slice(0, 5);

  const totalPredCount = predictions.length;
  const mostPredMatch = matches.reduce((best, m) => {
    const stats = getPredictionStats(m.id);
    return stats.total > (best?.stats?.total ?? 0) ? { match: m, stats } : best;
  }, null as { match: typeof matches[0]; stats: ReturnType<typeof getPredictionStats> } | null);

  const navCards = [
    { icon: Calendar, label: '赛程', desc: '查看全部104场比赛', path: '/schedule', color: 'text-[#00E676]' },
    { icon: TrendingUp, label: '预测', desc: '预测比赛赢积分', path: '/predict', color: 'text-[#FFD700]' },
    { icon: Trophy, label: '排行榜', desc: '争夺预测之王', path: '/leaderboard', color: 'text-[#FF1744]' },
  ];

  return (
    <div className="min-h-screen bg-[#0A1F1C] text-white relative overflow-hidden">
      {/* Diagonal grid background */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `repeating-linear-gradient(45deg, #00E676 0, #00E676 1px, transparent 1px, transparent 40px)`,
      }} />

      {/* Hero */}
      <section className="relative px-4 pt-16 pb-10 text-center">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-2">
          2026<span className="text-[#00E676]">美加墨</span>世界杯
        </h1>
        <p className="text-gray-400 text-lg mb-8">预测比赛结果，赢取排行榜荣耀</p>
        <div className="flex justify-center mb-6">
          <Countdown />
        </div>
      </section>

      {/* 焦点比赛 */}
      <section className="relative px-4 pb-8">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <span className="w-1 h-6 bg-[#00E676] rounded-full" />
          焦点比赛
        </h2>
        <div className="space-y-3">
          {upcomingMatches.map((m, i) => (
            <div key={m.id} className="animate-fade-in-up" style={{ animationDelay: `${i * 80}ms` }}>
              <MatchCard matchId={m.id} compact />
            </div>
          ))}
        </div>
      </section>

      {/* 预测热度 */}
      <section className="relative px-4 pb-8">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <span className="w-1 h-6 bg-[#FFD700] rounded-full" />
          预测热度
        </h2>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-[#0D2B26] rounded-xl p-4 border border-white/5">
            <p className="text-gray-400 text-sm mb-1">我的预测</p>
            <p className="text-3xl font-bold text-[#00E676] animate-count-up">{totalPredCount}</p>
          </div>
          <div className="bg-[#0D2B26] rounded-xl p-4 border border-white/5">
            <p className="text-gray-400 text-sm mb-1">最热比赛</p>
            <p className="text-lg font-bold text-[#FFD700] truncate">
              {mostPredMatch ? mostPredMatch.stats.total.toLocaleString() : '-'} 票
            </p>
          </div>
        </div>
      </section>

      {/* Quick nav */}
      <section className="relative px-4 pb-12">
        <div className="grid grid-cols-3 gap-3">
          {navCards.map((card, i) => (
            <button
              key={card.path}
              onClick={() => navigate(card.path)}
              className="bg-[#0D2B26] rounded-xl p-4 border border-white/5 hover:border-[#00E676]/40 transition-all duration-300 animate-fade-in-up group"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <card.icon className={`w-8 h-8 ${card.color} mx-auto mb-2 group-hover:scale-110 transition-transform`} />
              <p className="font-bold text-sm">{card.label}</p>
              <p className="text-gray-500 text-xs mt-1">{card.desc}</p>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
