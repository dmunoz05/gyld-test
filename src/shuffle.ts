import seedrandom from "seedrandom";
import { Player } from "./types";

export function assignTeams(players: Player[], numTeams: number, seed: string): Map<string, number> {
  const rng = seedrandom(seed);

  // We sort first by engagement, and in case of a tie we use seed
  const sorted = [...players].sort((a, b) => {
    if (b.engagement_score === a.engagement_score) {
      return rng() < 0.5 ? -1 : 1; // reproducible tiebreaker
    }
    return b.engagement_score - a.engagement_score;
  });

  const assignments = new Map<string, number>();
  sorted.forEach((player, index) => {
    const teamId = (index % numTeams) + 1;
    assignments.set(player.player_id, teamId);
  });

  return assignments;
}

/**
 * Calculate stats by team
 */
export function summarize(assignments: Map<string, number>, players: Player[], numTeams: number) {
  const summaries: any[] = [];

  for (let t = 1; t <= numTeams; t++) {
    const teamPlayers = players.filter(p => assignments.get(p.player_id) === t);
    const size = teamPlayers.length;
    const avgScore = teamPlayers.reduce((sum, p) => sum + p.engagement_score, 0) / size;

    summaries.push({
      team: t,
      size,
      avgEngagement: avgScore.toFixed(2),
      justification: "The teams were balanced by activity (engagement) so that everyone had a similar level."
    });
  }

  return summaries;
}

