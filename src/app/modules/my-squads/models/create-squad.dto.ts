import { Guid } from "guid-typescript";

export interface CreateSquadDto {
  name: string;
  allowSkillLevel: boolean;
  squadConfigs: Array<CreateSquadConfigDto>;
}

export interface CreateSquadConfigDto {
  playerTypeId: string;
  quantityPlayers: number;
  allowSubstitutes: boolean;
}
