import {Guid} from "guid-typescript";

export interface CreateSquadConfigForm {
  quantity: number,
  allowsAlternate: boolean,
  playerTypeId: string,
  playerTypeName: string,
  playerTypeIcon: string
}
