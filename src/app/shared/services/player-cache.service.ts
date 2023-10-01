import { Injectable } from '@angular/core';
import { PlayerDto } from "../models/player/player.dto";

@Injectable({
  providedIn: 'root'
})
export class PlayerCacheService {

  private keyCache: string = "player-cache";
  private playerCache: PlayerDto;

  constructor() { }

  getPlayerInCache(): PlayerDto | null {
    const playerCache = localStorage.getItem(this.keyCache);
    if (!playerCache) return null;

    return Object.assign({}, this.playerCache, JSON.parse(playerCache));
  }

  setPlayerInCache(player: PlayerDto): void {
    if (!player) return;
    localStorage.setItem(this.keyCache, JSON.stringify(player));
  }
}
