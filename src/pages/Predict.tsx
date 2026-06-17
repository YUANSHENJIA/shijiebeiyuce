import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMatchStore } from '@/store/useMatchStore';
import { usePredictStore } from '@/store/usePredictStore';
import { useUserStore } from '@/store/useUserStore';
import type { Prediction } from '@/types';

type Tab = 'pending' | 'history';

export default function Predict() {
  const navigate = useNavigate();
  const [tab, setTab] = useState<Tab>('pending');
  const { matches, getTeamById } = useMatchStore();
  const { predictions, addPrediction } = usePredictStore();
  const { totalPredictions, correctPredictions } = useUserStore();

  const accuracy = totalPredictions > 0 ? Math.round((correctPredictions / totalPredictions) * 100) : 0;

  const pendingMatches = useMemo(() => {
    const predictedIds = new Set(predictions.map((p) => p.matchId));
    return [...matches]
      .filter((m) => !predictedIds.has(m.id))
      .sort((a, b) => `${a.date}T${a.time}`.localeCompare(`${b.date}T${b.time}`));
  }, [matches, predictions]);

  const finishedMatches = useMemo(() => {
    return matches.filter((m) => m.status === 'finished');
  }, [matches]);

  const handleQuickPredict = (matchId: string, result: Prediction['result']) => {
    addPrediction({ matchId, result, confidence: 75 });
  };

  const quickBtn = (matchId: string, result: Prediction['result'], label: string) => (
    <button
      onClick={() => handleQuickPredict(matchId, result)}
      className="px-3 py-1.5 rounded-lg text-xs font-medium bg-[#0D2B26] border border-white/10 hover:border-[#00E676]/40 hover:text-[#00E676] transition-all"
    >
      {label}
    </button>
  );

  const isCorrectPrediction = (prediction: Prediction) => {
    const match = matches.find((m) => m.id === prediction.matchId);
    if (!match || match.status !== 'finished') return null;
    if (match.homeScore === match.awayScore && prediction.result === 'draw') return true;
    if (match.homeScore! > match.awayScore! && prediction.result === 'home') return true;
    if (match.awayScore! > match.homeScore! && prediction.result === 'away') return true;
    return false;
  };

  return (
    <div className="min-h-screen bg-[#0A1F1C] text-white pb-12">
      {/* Header */}
      <div className="px-4 pt-6 pb-2">
        <h1 className="text-2xl font-bold">预测中心</h1>
      </div>

      {/* Stats card */}
      <div className="px-4 mb-6">
        <div className="bg-[#0D2B26] rounded-xl p-4 border border-white/5 grid grid-cols-3 gap-3 text-center">
          <div>
            <p className="text-2xl font-bold text-[#00E676]">{totalPredictions}</p>
            <p className="text-xs text-gray-400 mt-1">总预测</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-[#FFD700]">{accuracy}%</p>
            <p className="text-xs text-gray-400 mt-1">准确率</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-[#FF1744]">{correctPredictions}</p>
            <p className="text-xs text-gray-400 mt-1">正确</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="px-4 mb-4">
        <div className="flex bg-[#0D2B26] rounded-xl p-1 border border-white/5">
          {(['pending', 'history'] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
                tab === t ? 'bg-[#00E676] text-[#0A1F1C]' : 'text-gray-400 hover:text-white'
              }`}
            >
              {t === 'pending' ? `待预测 (${pendingMatches.length})` : `预测历史 (${predictions.length})`}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="px-4">
        {tab === 'pending' ? (
          pendingMatches.length === 0 ? (
            <div className="text-center py-16 text-gray-500">
              <p className="text-4xl mb-3">🎉</p>
              <p>所有比赛已预测完毕</p>
            </div>
          ) : (
            <div className="space-y-3">
              {pendingMatches.map((m) => {
                const home = getTeamById(m.homeTeamId);
                const away = getTeamById(m.awayTeamId);
                return (
                  <div key={m.id} className="bg-[#0D2B26] rounded-xl p-4 border border-white/5">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2 text-sm">
                        <span>{home?.flag ?? '?'}</span>
                        <span className="font-medium">{home?.name ?? m.homeTeamId}</span>
                        <span className="text-gray-500">vs</span>
                        <span className="font-medium">{away?.name ?? m.awayTeamId}</span>
                        <span>{away?.flag ?? '?'}</span>
                      </div>
                      <button
                        onClick={() => navigate(`/match/${m.id}`)}
                        className="text-xs text-[#00E676] hover:underline"
                      >
                        详情 →
                      </button>
                    </div>
                    <div className="flex gap-2">
                      {quickBtn(m.id, 'home', '主胜')}
                      {quickBtn(m.id, 'draw', '平局')}
                      {quickBtn(m.id, 'away', '客胜')}
                    </div>
                  </div>
                );
              })}
            </div>
          )
        ) : (
          predictions.length === 0 ? (
            <div className="text-center py-16 text-gray-500">
              <p className="text-4xl mb-3">📝</p>
              <p>暂无预测记录</p>
            </div>
          ) : (
            <div className="space-y-3">
              {predictions.map((p) => {
                const match = matches.find((m) => m.id === p.matchId);
                if (!match) return null;
                const home = getTeamById(match.homeTeamId);
                const away = getTeamById(match.awayTeamId);
                const resultLabel = p.result === 'home' ? '主胜' : p.result === 'draw' ? '平局' : '客胜';
                const isCorrect = isCorrectPrediction(p);
                const isFinished = match.status === 'finished';

                return (
                  <div key={p.id} className="bg-[#0D2B26] rounded-xl p-4 border border-white/5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm">
                        <span>{home?.flag ?? '?'}</span>
                        <span className="font-medium">{home?.name ?? match.homeTeamId}</span>
                        {isFinished && match.homeScore !== undefined ? (
                          <span className={`font-bold ${match.homeScore! > match.awayScore! ? 'text-[#00E676]' : 'text-gray-400'}`}>
                            {match.homeScore}
                          </span>
                        ) : (
                          <span className="text-gray-500">vs</span>
                        )}
                        {isFinished && match.awayScore !== undefined && (
                          <span className={`font-bold ${match.awayScore! > match.homeScore! ? 'text-[#00E676]' : 'text-gray-400'}`}>
                            {match.awayScore}
                          </span>
                        )}
                        {!isFinished && <span className="text-gray-500">vs</span>}
                        <span className="font-medium">{away?.name ?? match.awayTeamId}</span>
                        <span>{away?.flag ?? '?'}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {isFinished ? (
                          isCorrect ? (
                            <span className="text-xs px-2 py-1 rounded-full bg-[#00E676]/20 text-[#00E676] font-medium">
                              ✓ 正确
                            </span>
                          ) : (
                            <span className="text-xs px-2 py-1 rounded-full bg-red-500/20 text-red-400 font-medium">
                              ✗ 错误
                            </span>
                          )
                        ) : (
                          <span className="text-xs px-2 py-1 rounded-full bg-[#00E676]/10 text-[#00E676] font-medium">
                            {resultLabel}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs text-gray-500">
                        {isFinished ? '已完成' : `信心 ${p.confidence}%`}
                      </span>
                      <button
                        onClick={() => navigate(`/match/${match.id}`)}
                        className="text-xs text-gray-400 hover:text-[#00E676] transition-colors"
                      >
                        查看详情 →
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )
        )}
      </div>
    </div>
  );
}
