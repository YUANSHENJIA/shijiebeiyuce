import { useState } from 'react';
import { useUserStore } from '@/store/useUserStore';

type RankTab = 'week' | 'total';

const ACHIEVEMENTS = [
  { id: '初出茅庐', icon: '🌱', desc: '完成首次预测' },
  { id: '预言家', icon: '🔮', desc: '正确预测10场' },
  { id: '数据达人', icon: '📊', desc: '正确预测5场' },
  { id: '铁杆球迷', icon: '⚽', desc: '预测30场比赛' },
  { id: '常胜将军', icon: '🏆', desc: '正确率超过60%' },
  { id: '黑马猎手', icon: '🐴', desc: '猜中冷门结果' },
  { id: '全勤王', icon: '🏅', desc: '预测所有比赛' },
  { id: '夜猫子', icon: '🦉', desc: '深夜预测比赛' },
  { id: '冷门大师', icon: '❄️', desc: '连续猜中冷门' },
];

const PODIUM_STYLES = [
  { border: 'border-gray-400', bg: 'bg-gray-400/10', text: 'text-gray-300', label: '🥈', scale: '' },
  { border: 'border-[#FFD700]', bg: 'bg-[#FFD700]/10', text: 'text-[#FFD700]', label: '🥇', scale: 'scale-110' },
  { border: 'border-amber-700', bg: 'bg-amber-700/10', text: 'text-amber-600', label: '🥉', scale: '' },
];

export default function Leaderboard() {
  const [tab, setTab] = useState<RankTab>('total');
  const { mockUsers, currentUser } = useUserStore();

  const allUsers = [...mockUsers, currentUser].sort((a, b) => b.totalPoints - a.totalPoints);
  const top3 = allUsers.slice(0, 3);
  const rest = allUsers.slice(3);
  const displayOrder = top3.length >= 3 ? [top3[1], top3[0], top3[2]] : top3;

  return (
    <div className="min-h-screen bg-[#0A1F1C] text-white pb-12">
      {/* Header */}
      <div className="px-4 pt-6 pb-2">
        <h1 className="text-2xl font-bold">排行榜</h1>
      </div>

      {/* Tabs */}
      <div className="px-4 mb-6">
        <div className="flex bg-[#0D2B26] rounded-xl p-1 border border-white/5 w-48">
          {(['week', 'total'] as RankTab[]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
                tab === t ? 'bg-[#00E676] text-[#0A1F1C]' : 'text-gray-400 hover:text-white'
              }`}
            >
              {t === 'week' ? '周榜' : '总榜'}
            </button>
          ))}
        </div>
      </div>

      {/* Top 3 podium */}
      <section className="px-4 mb-8">
        <div className="flex items-end justify-center gap-3">
          {displayOrder.map((user, i) => {
            const style = PODIUM_STYLES[i];
            return (
              <div
                key={user.id}
                className={`flex-1 max-w-[140px] bg-[#0D2B26] rounded-xl p-4 border-2 ${style.border} ${style.bg} text-center transition-transform ${style.scale}`}
              >
                <div className="text-3xl mb-1">{style.label}</div>
                <div className="text-4xl mb-2">{user.avatar}</div>
                <p className="font-bold text-sm truncate">{user.name}</p>
                <p className={`text-lg font-black mt-1 ${style.text}`}>{user.totalPoints}</p>
                <p className="text-xs text-gray-500">积分</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Full ranking */}
      <section className="px-4 mb-8">
        <h2 className="text-base font-bold mb-3 flex items-center gap-2">
          <span className="w-1 h-4 bg-[#FFD700] rounded-full" />
          完整排名
        </h2>
        <div className="space-y-2">
          {rest.map((user, i) => {
            const isCurrent = user.id === 'current';
            const accuracy = user.totalPredictions > 0
              ? Math.round((user.correctPredictions / user.totalPredictions) * 100)
              : 0;
            return (
              <div
                key={user.id}
                className={`flex items-center gap-3 bg-[#0D2B26] rounded-xl px-4 py-3 border ${
                  isCurrent ? 'border-[#00E676]/40 bg-[#00E676]/5' : 'border-white/5'
                }`}
              >
                <span className="text-sm font-bold text-gray-500 w-6 text-center">{i + 4}</span>
                <span className="text-2xl">{user.avatar}</span>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate">
                    {user.name}
                    {isCurrent && <span className="text-[#00E676] text-xs ml-1">(我)</span>}
                  </p>
                  <p className="text-xs text-gray-500">{user.totalPredictions}场 · 准确率{accuracy}%</p>
                </div>
                <span className="text-[#FFD700] font-bold text-sm">{user.totalPoints}</span>
              </div>
            );
          })}
        </div>
      </section>

      {/* Achievements */}
      <section className="px-4">
        <h2 className="text-base font-bold mb-3 flex items-center gap-2">
          <span className="w-1 h-4 bg-[#FF1744] rounded-full" />
          成就徽章
        </h2>
        <div className="grid grid-cols-3 gap-3">
          {ACHIEVEMENTS.map((ach) => {
            const unlocked = currentUser.achievements.includes(ach.id);
            return (
              <div
                key={ach.id}
                className={`bg-[#0D2B26] rounded-xl p-3 border text-center transition-all ${
                  unlocked ? 'border-[#FFD700]/30' : 'border-white/5 opacity-40'
                }`}
              >
                <div className={`text-2xl mb-1 ${unlocked ? '' : 'grayscale'}`}>{ach.icon}</div>
                <p className="text-xs font-medium truncate">{ach.id}</p>
                <p className="text-[10px] text-gray-500 mt-0.5">{ach.desc}</p>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
