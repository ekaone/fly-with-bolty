export type GameState = 'start' | 'playing' | 'gameOver';

export interface ObstacleType {
  position: number;
  height: number;
  gap: number;
  passed: boolean;
}