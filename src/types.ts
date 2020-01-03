export interface Player {
  id: string;
  battletag: string;
  points: number;
  role: 'offense' | 'tank' | 'support';
}
export type Team = Player[];
export type Match = Team[];
export type League = 'offense' | 'support' | 'tank' | 'bronze' | 'silver' | 'gold' | 'platinum' | 'diamond' | 'master' | 'gm' | 'top500';
export type ScoreDifferences = Array<{player: Player, difference: number}>;