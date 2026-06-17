export interface Team {
  id: string;
  name: string;
  nameEn: string;
  flag: string;
  groupCode: string;
  fifaRank: number;
  region: string;
}

export interface Group {
  code: string;
  name: string;
  teamIds: string[];
}

export interface Match {
  id: string;
  homeTeamId: string;
  awayTeamId: string;
  date: string;
  time: string;
  venue: string;
  city: string;
  stage: 'group' | 'r32' | 'r16' | 'qf' | 'sf' | '3rd' | 'final';
  groupCode?: string;
  matchday: number;
  homeScore?: number;
  awayScore?: number;
  status?: 'upcoming' | 'live' | 'finished';
}

export interface Prediction {
  id: string;
  matchId: string;
  result: 'home' | 'draw' | 'away';
  confidence: number;
  createdAt: string;
}

export interface MockUser {
  id: string;
  name: string;
  avatar: string;
  totalPoints: number;
  correctPredictions: number;
  totalPredictions: number;
  achievements: string[];
}
