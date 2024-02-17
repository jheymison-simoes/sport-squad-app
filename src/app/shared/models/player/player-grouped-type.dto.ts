export interface PlayerGroupedTypeDto {
  playerTypeId: string;
  playerTypeName: string;
  playerTypeIcon: string;
  quantityMaxPlayers: number;
  quantityPlayers: number;
  players: PlayerGroupedPlayerDto[];
}

export interface PlayerGroupedPlayerDto {
  playerId: string;
  name: string;
  skillLevel: number;
  substitute: boolean;
  index: number;
}
