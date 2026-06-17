import { create } from 'zustand';
import type { Prediction } from '@/types';

const STORAGE_KEY = 'worldcup2026-predictions';

function loadPredictions(): Prediction[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored) as Prediction[];
    }
  } catch {
    // ignore parse errors
  }
  return [];
}

function savePredictions(predictions: Prediction[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(predictions));
  } catch {
    // ignore storage errors
  }
}

interface PredictionStats {
  home: number;
  draw: number;
  away: number;
  total: number;
}

interface PredictStore {
  predictions: Prediction[];
  addPrediction: (prediction: Omit<Prediction, 'id' | 'createdAt'>) => void;
  updatePrediction: (id: string, updates: Partial<Pick<Prediction, 'result' | 'confidence'>>) => void;
  getPredictionByMatchId: (matchId: string) => Prediction | undefined;
  getPredictionStats: (matchId: string) => PredictionStats;
}

// Seeded random for consistent mock community prediction stats
function seededRandom(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

export const usePredictStore = create<PredictStore>((set, get) => ({
  predictions: loadPredictions(),

  addPrediction: (prediction) => {
    const newPrediction: Prediction = {
      ...prediction,
      id: `pred-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      createdAt: new Date().toISOString(),
    };
    const updated = [...get().predictions, newPrediction];
    savePredictions(updated);
    set({ predictions: updated });
  },

  updatePrediction: (id, updates) => {
    const updated = get().predictions.map((p) =>
      p.id === id ? { ...p, ...updates } : p
    );
    savePredictions(updated);
    set({ predictions: updated });
  },

  getPredictionByMatchId: (matchId: string) => {
    return get().predictions.find((p) => p.matchId === matchId);
  },

  getPredictionStats: (matchId: string) => {
    // Use mock random data to simulate community predictions
    const hash = matchId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const rng = seededRandom(hash);

    const homePercent = Math.floor(rng() * 60) + 20; // 20-79
    const drawPercent = Math.floor(rng() * 30) + 5;  // 5-34
    const awayPercent = 100 - homePercent - drawPercent;
    const total = Math.floor(rng() * 5000) + 1000; // 1000-5999 total predictions

    return {
      home: Math.round((homePercent / 100) * total),
      draw: Math.round((drawPercent / 100) * total),
      away: Math.round((awayPercent / 100) * total),
      total,
    };
  },
}));
