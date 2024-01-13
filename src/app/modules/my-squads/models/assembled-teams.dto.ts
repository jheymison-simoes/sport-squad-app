export interface AssembledTeamsDto {
    squadId: string;
    teamName: string;
    players: Array<TeamDto>;
}

export interface TeamDto {
    playerId: string;
    playerName: string;
    playerTypeId: string;
    playerTypeCode: number;
    playerTypeName: string;
    skillLevel: number;
}
