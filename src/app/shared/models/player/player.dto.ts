import { PlayerTypeDto } from '../player-type/player-type.dto';

export interface PlayerDto {
  id: string;
  name: string;
  playerTypeId: string;
  squadId: string;
  userId?: string;
  skillLevel: number;
  playerType: PlayerTypeDto;
}
