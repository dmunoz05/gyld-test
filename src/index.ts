import * as XLSX from "xlsx";
import { Player } from "./types";
import { assignTeams, summarize } from "./shuffle";

// Arguments
const args = require("minimist")(process.argv.slice(2));
const numTeams = args.teams || 3;
const seed = args.seed || "default";

// Datasets
const workbook = XLSX.readFile("data/level_a_players.xlsx");
const sheetName = workbook.SheetNames[0];
const data: any[] = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

// Normalicer dates
const players: Player[] = data.map(row => ({
  player_id: String(row.player_id),
  current_team_id: String(row.current_team_id),
  current_team_name: String(row.current_team_name),
  historical_events_participated: Number(row.historical_events_participated),
  historical_event_engagements: Number(row.historical_event_engagements),
  historical_points_earned: Number(row.historical_points_earned),
  historical_points_spent: Number(row.historical_points_spent),
  current_total_points: Number(row.current_total_points),
  historical_messages_sent: Number(row.historical_messages_sent),
  days_active_last_30: Number(row.days_active_last_30),
  current_streak_value: Number(row.current_streak_value),
  last_active_ts: Number(row.last_active_ts),
  engagement_score: Number(row.days_active_last_30)
    + Number(row.historical_events_participated)
    + Number(row.current_streak_value)
}));

// Assignment teams
const assignments = assignTeams(players, numTeams, seed);

// Outputs
console.log("Assignments:");
players.forEach(p => {
  console.log(`${p.player_id} -> Team ${assignments.get(p.player_id)}`);
});

// Resumen
console.log("\nSummary by team:");
console.table(summarize(assignments, players, numTeams));
