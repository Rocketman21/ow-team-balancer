import { Player } from "types";

export const getRandomInt = (max: number) => {
  return Math.floor(Math.random() * Math.floor(max));
}

export const getPlayersAverageScore = (players: Player[]) => Math.round(
  players.reduce((memo, player) => memo + player.points, 0) / players.length
);