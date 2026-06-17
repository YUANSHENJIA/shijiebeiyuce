import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useMatchStore } from '@/store/useMatchStore';
import { usePredictStore } from '@/store/usePredictStore';
import TeamBadge from '@/components/TeamBadge';
import StageBadge from '@/components/StageBadge';
import PredictionBar from '@/components/PredictionBar';
import GroupTable from '@/components/GroupTable';
import type { Prediction } from '@/types';

type PredictResult = Prediction['result'];

export default function MatchDetail() {
  const { matchId } = useParams<{ matchId: string }>();
  const navigate = useNavigate();
  const { getMatchById } = useMatchStore();
  const { getPredictionByMatchId, getPredictionStats, addPrediction, updatePrediction } = usePredictStore();

  const match = matchId ? getMatchById(matchId) : undefined;
  const existing = matchId ? getPredictionByMatchId(matchId) : undefined;
  const stats = matchId ? getPredictionStats(matchId) : { home: 0, draw: 0, away: 0, total: 0 };

  const [selected, setSelected] = useState<PredictResult | null>(existing?.result ?? null);
  const [confidence, setConfidence] = useState(existing?.confidence ?? 75);

  if (!match) {
    return (
      <div className="min-h-screen bg-[#0A1F1C] text-white flex items-center justify-center">
        <p className="text-gray-500">比赛未找到</p>
      </div>
    );
  }

  const homePercent = stats.total > 0 ? Math.round((stats.home / stats.total) * 100) : 0;
  const drawPercent = stats.total > 0 ? Math.round((stats.draw / stats.total) * 100) : 0;
  const awayPercent = stats.total > 0 ? 100 - homePercent - drawPercent : 0;

  const isFinished = match.status === 'finished';
  const isUpcoming = match.status === 'upcoming' || !match.status;

  const handleSubmit = () => {
    if (!selected || !matchId) return;
    if (existing) {
      updatePrediction(existing.id, { result: selected, confidence });
    } else {
      addPrediction({ matchId, result: selected, confidence });
    }
  };

  const resultBtn = (value: PredictResult, label: string, disabled = false) => (
    <button
      onClick={() => !disabled && setSelected(value)}
      disabled={disabled}
      className={`flex-1 py-3 rounded-xl font-bold text-lg transition-all duration-200 ${
        disabled
          ? 'bg-[#0D2B26] text-gray-600 cursor-not-allowed opacity-50'
          : selected === value
          ? 'bg-[#00E676] text-[#0A1F1C] shadow-lg shadow-[#00E676]/20'
          : 'bg-[#0D2B26] text-gray-400 border border-white/10 hover:border-[#00E676]/30'
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="min-h-screen bg-[#0A1F1C] text-white pb-12">
      {/* Back header */}
      <div className="px-4 pt-4 pb-2">
        <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-gray-400 hover:text-[#00E676] transition-colors">
          <ArrowLeft className="w-5 h-5" /> 返回
        </button>
      </div>

      {/* Team comparison */}
      <section className="px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex-1 flex justify-center">
            <TeamBadge teamId={match.homeTeamId} size="lg" />
          </div>
          <div className="px-4 text-center">
            {isFinished ? (
              <div className="flex items-center gap-2">
                <span className={`text-4xl font-black ${match.homeScore! > match.awayScore! ? 'text-[#00E676]' : 'text-gray-400'}`}>
                  {match.homeScore}
                </span>
                <span className="text-2xl text-gray-500">-</span>
                <span className={`text-4xl font-black ${match.awayScore! > match.homeScore! ? 'text-[#00E676]' : 'text-gray-400'}`}>
                  {match.awayScore}
                </span>
              </div>
            ) : (
              <span className="text-3xl font-black text-[#00E676]">VS</span>
            )}
          </div>
          <div className="flex-1 flex justify-center">
            <TeamBadge teamId={match.awayTeamId} size="lg" />
          </div>
        </div>
      </section>

      {/* Match info */}
      <section className="px-4 mb-6">
        <div className="bg-[#0D2B26] rounded-xl p-4 border border-white/5 text-center space-y-2">
          <div className="flex justify-center gap-2">
            <StageBadge stage={match.stage} />
            {match.groupCode && <span className="text-xs text-gray-500">{match.groupCode}组</span>}
            {isFinished && <span className="text-xs text-[#00E676] bg-[#00E676]/10 px-2 py-0.5 rounded-full">已结束</span>}
          </div>
          <p className="text-lg font-semibold">{match.date} {match.time}</p>
          <p className="text-gray-400 text-sm">{match.venue} · {match.city}</p>
        </div>
      </section>

      {/* 社区预测 */}
      <section className="px-4 mb-6">
        <h3 className="text-base font-bold mb-3 flex items-center gap-2">
          <span className="w-1 h-4 bg-[#00E676] rounded-full" />
          社区预测
          <span className="text-xs text-gray-500 font-normal">{stats.total} 人参与</span>
        </h3>
        <PredictionBar homePercent={homePercent} drawPercent={drawPercent} awayPercent={awayPercent} />
      </section>

      {/* 我的预测 / 比赛结果 */}
      {isFinished ? (
        <section className="px-4 mb-6">
          <h3 className="text-base font-bold mb-3 flex items-center gap-2">
            <span className="w-1 h-4 bg-[#FF1744] rounded-full" />
            比赛结果
          </h3>
          <div className="bg-[#0D2B26] rounded-xl p-4 border border-white/5">
            <div className="flex justify-around text-center">
              <div>
                <p className="text-gray-400 text-sm mb-1">主胜</p>
                <p className={`text-2xl font-bold ${match.homeScore! > match.awayScore! ? 'text-[#00E676]' : 'text-gray-500'}`}>
                  {homePercent}%
                </p>
              </div>
              <div>
                <p className="text-gray-400 text-sm mb-1">平局</p>
                <p className={`text-2xl font-bold ${match.homeScore === match.awayScore ? 'text-[#00E676]' : 'text-gray-500'}`}>
                  {drawPercent}%
                </p>
              </div>
              <div>
                <p className="text-gray-400 text-sm mb-1">客胜</p>
                <p className={`text-2xl font-bold ${match.awayScore! > match.homeScore! ? 'text-[#00E676]' : 'text-gray-500'}`}>
                  {awayPercent}%
                </p>
              </div>
            </div>
            {existing && (
              <div className="mt-4 pt-4 border-t border-white/10 text-center">
                <p className="text-gray-400 text-sm">你的预测</p>
                <p className={`text-lg font-bold ${existing.result === 'home' && match.homeScore! > match.awayScore! || existing.result === 'away' && match.awayScore! > match.homeScore! || existing.result === 'draw' && match.homeScore === match.awayScore ? 'text-[#00E676]' : 'text-red-400'}`}>
                  {existing.result === 'home' ? '主胜' : existing.result === 'away' ? '客胜' : '平局'}
                  {existing.result === 'home' && match.homeScore! > match.awayScore! || existing.result === 'away' && match.awayScore! > match.homeScore! || existing.result === 'draw' && match.homeScore === match.awayScore ? ' ✓ 正确' : ' ✗ 错误'}
                </p>
              </div>
            )}
          </div>
        </section>
      ) : (
        <section className="px-4 mb-6">
          <h3 className="text-base font-bold mb-3 flex items-center gap-2">
            <span className="w-1 h-4 bg-[#FFD700] rounded-full" />
            我的预测
            {existing && <span className="text-xs text-[#00E676] font-normal">已预测</span>}
          </h3>
          <div className="space-y-3">
            <div className="flex gap-3">
              {resultBtn('home', '主胜', !isUpcoming)}
              {resultBtn('draw', '平局', !isUpcoming)}
              {resultBtn('away', '客胜', !isUpcoming)}
            </div>
            <div>
              <div className="flex justify-between text-sm text-gray-400 mb-1">
                <span>信心指数</span>
                <span className="text-[#00E676]">{confidence}</span>
              </div>
              <input
                type="range" min={1} max={100} value={confidence}
                onChange={(e) => setConfidence(Number(e.target.value))}
                disabled={!isUpcoming}
                className={`w-full accent-[#00E676] h-2 rounded-full ${!isUpcoming ? 'opacity-50' : ''}`}
              />
            </div>
            <button
              onClick={handleSubmit}
              disabled={!selected || !isUpcoming}
              className={`w-full py-3 rounded-xl font-bold transition-all duration-200 ${
                selected && isUpcoming
                  ? 'bg-[#00E676] text-[#0A1F1C] hover:shadow-lg hover:shadow-[#00E676]/20'
                  : 'bg-[#0D2B26] text-gray-600 cursor-not-allowed'
              }`}
            >
              {existing ? '更新预测' : '提交预测'}
            </button>
          </div>
        </section>
      )}

      {/* 小组排名 */}
      {match.stage === 'group' && match.groupCode && (
        <section className="px-4 mb-6">
          <h3 className="text-base font-bold mb-3 flex items-center gap-2">
            <span className="w-1 h-4 bg-[#FF1744] rounded-full" />
            小组排名
          </h3>
          <GroupTable groupCode={match.groupCode} />
        </section>
      )}
    </div>
  );
}
