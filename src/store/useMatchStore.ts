import { create } from 'zustand';
import type { Team, Group, Match } from '@/types';
import { teams as teamsData } from '@/data/teams';
import { groups as groupsData } from '@/data/groups';
import { matches as matchesData } from '@/data/matches';

interface GroupStanding {
  teamId: string;
  team: Team;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  points: number;
}

interface MatchStore {
  teams: Team[];
  groups: Group[];
  matches: Match[];
  getTeamById: (id: string) => Team | undefined;
  getMatchById: (id: string) => Match | undefined;
  getMatchesByStage: (stage: Match['stage']) => Match[];
  getMatchesByGroup: (groupCode: string) => Match[];
  getGroupStandings: (groupCode: string) => GroupStanding[];
}

// Seeded pseudo-random number generator for consistent mock scores
function seededRandom(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

// Generate mock scores for group stage matches (deterministic per match)
function getMockScore(matchId: string): [number, number] {
  const hash = matchId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const rng = seededRandom(hash);
  const homeGoals = Math.floor(rng() * 4);
  const awayGoals = Math.floor(rng() * 4);
  return [homeGoals, awayGoals];
}

export const useMatchStore = create<MatchStore>((set, get) => ({
  teams: teamsData,
  groups: groupsData,
  matches: matchesData,

  getTeamById: (id: string) => {
    return get().teams.find((team) => team.id === id);
  },

  getMatchById: (id: string) => {
    return get().matches.find((match) => match.id === id);
  },

  getMatchesByStage: (stage: Match['stage']) => {
    return get().matches.filter((match) => match.stage === stage);
  },

  getMatchesByGroup: (groupCode: string) => {
    return get().matches.filter(
      (match) => match.stage === 'group' && match.groupCode === groupCode
    );
  },

  getGroupStandings: (groupCode: string) => {
    const { teams, matches } = get();
    const groupMatches = matches.filter(
      (m) => m.stage === 'group' && m.groupCode === groupCode
    );
    const group = groupsData.find((g) => g.code === groupCode);
    if (!group) return [];

    const standings: GroupStanding[] = group.teamIds.map((teamId) => {
      const team = teams.find((t) => t.id === teamId)!;
      const standing: GroupStanding = {
        teamId,
        team,
        played: 0,
        won: 0,
        drawn: 0,
        lost: 0,
        goalsFor: 0,
        goalsAgainst: 0,
        goalDifference: 0,
        points: 0,
      };

      groupMatches.forEach((match) => {
        const isHome = match.homeTeamId === teamId;
        const isAway = match.awayTeamId === teamId;
        if (!isHome && !isAway) return;

        const [homeGoals, awayGoals] = getMockScore(match.id);
        standing.played += 1;
        standing.goalsFor += isHome ? homeGoals : awayGoals;
        standing.goalsAgainst += isHome ? awayGoals : homeGoals;

        if (homeGoals === awayGoals) {
          standing.drawn += 1;
          standing.points += 1;
        } else if ((isHome && homeGoals > awayGoals) || (isAway && awayGoals > homeGoals)) {
          standing.won += 1;
          standing.points += 3;
        } else {
          standing.lost += 1;
        }
      });

      standing.goalDifference = standing.goalsFor - standing.goalsAgainst;
      return standing;
    });

    // Sort by points, then goal difference, then goals for
    standings.sort((a, b) => {
      if (b.points !== a.points) return b.points - a.points;
      if (b.goalDifference !== a.goalDifference) return b.goalDifference - a.goalDifference;
      return b.goalsFor - a.goalsFor;
    });

    return standings;
  },
}));
