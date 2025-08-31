export interface Player {
  player_id: string;
  current_team_id: string;
  current_team_name: string;
  historical_events_participated: number;
  historical_event_engagements: number;
  historical_points_earned: number;
  historical_points_spent: number;
  current_total_points: number;
  historical_messages_sent: number;
  days_active_last_30: number;
  current_streak_value: number;
  last_active_ts: number;
  engagement_score: number;
}
