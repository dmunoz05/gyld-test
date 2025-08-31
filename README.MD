# Gyld Team Shuffle

## How to run
1. Install dependencies:
   npm install

2. Execute:
   npm start -- --teams 3 --seed 42

3. Exit:
   ```
   Assignments:
   player_1 -> Team 1
   player_2 -> Team 2
   ...

   Summary by team:
   ┌─────────┬───────┬────────────────┬─────────────────────────────────────────────────────────────┐
   │ (index) │ size  │ avgEngagement  │ justification                                               │
   ├─────────┼───────┼────────────────┼─────────────────────────────────────────────────────────────┤
   │    1    │  34   │ '15.23'        │ 'The teams were balanced by activity (engagement)…'         │
   └─────────┴───────┴────────────────┴─────────────────────────────────────────────────────────────┘
   ```

## Approach
An "engagement score" is calculated for each player: engagement score = last 30 active days + historical events participated in + current streak

Then:
- Players are ranked by score.
- In the event of a tie, the seed (--seed) is used to break the tie deterministically.
- Teams are divided into round-robin teams, ensuring balanced sizes (no team has more than one extra player compared to another).

## Modeling Decision
I chose a simple and transparent score that all players can easily understand.
I prefer clarity over sophistication in this first version: it's easier to explain "balanced by recent activity and participation" than a complex formula.

## Time-limit tradeoffs
- The score does not weight metrics such as points earned or messages sent.
- Round-robin balancing instead of a more advanced optimization algorithm.
- No integrity validations on input data (assuming a clean dataset).

## Future (what would you add with more time)
- Include more metrics (points, messages sent, days active) in the score calculation.
- Generate a visual report (e.g., charts by team).
- Allow choosing different shuffle strategies (by points, by activity, mixed).
- API or web interface to display the reallocation directly to the community.

## Time spent
01:50

## Tie-break
When two players have the same engagement score, the seed (--seed) is used to determine the order in a deterministic and reproducible manner.