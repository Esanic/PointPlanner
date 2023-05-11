import { Injectable } from '@angular/core';
import { Race } from '../models/race';
import { CharacterAttributes } from '../models/characterAttributes';
import { Level } from '../models/level';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  public defaultRace: Race = {
    name: 'Default', 
    baseWeight: 0,
    damageWithShield: 1,
    critChances: {baseCrit: 1, baseMaxCrit: 1, maxDamage: 1},
    skills: {stamina: 1, strength: 1, endurance: 1, initiative: 1, dodge: 1, learningCapacity: 1, luck: 1, discipline: 1},
    weaponSkills: {axe: 1, sword: 1, mace: 1, stave: 1, shield: 1, spear: 1, chain: 1}
  }

  public human: Race = {
    name: 'Människa', 
    baseWeight: 5,
    damageWithShield: 0.85,
    critChances: {baseCrit: 1.05, baseMaxCrit: 1.11, maxDamage: 1.2},
    skills: {stamina: 1.1, strength: 1.1, endurance: 1.1, initiative: 1.1, dodge: 1.1, learningCapacity: 1.1, luck: 1.1, discipline: 1.1},
    weaponSkills: {axe: 1.2, sword: 1.2, mace: 1.1, stave: 1.1, shield: 1.1, spear: 1.1, chain: 1.1}
  }
  public elf: Race = {
    name: 'Alv', 
    baseWeight: 0,
    damageWithShield: 0.8,
    critChances: {baseCrit: 1, baseMaxCrit: 1.1, maxDamage: 1.2},
    skills: {stamina: 0.9, strength: 0.9, endurance: 1.3, initiative: 1.25, dodge: 1.55, learningCapacity: 1.2, luck: 1.1, discipline: 1},
    weaponSkills: {axe: 1, sword: 1.15, mace: 1, stave: 1.2, shield: 1.25, spear: 1.3, chain: 1}
  }
  public dwarf: Race = {
    name: 'Dvärg', 
    baseWeight: 4,
    damageWithShield: 0.95,
    critChances: {baseCrit: 1.05, baseMaxCrit: 1.11, maxDamage: 1.2},
    skills: {stamina: 1.3, strength: 1.2, endurance: 0.9, initiative: 0.85, dodge: 0.6, learningCapacity: 1.1, luck: 1, discipline: 1.2},
    weaponSkills: {axe: 1.2, sword: 1, mace: 1.2, stave: 0.85, shield: 1.1, spear: 0.9, chain: 1}
  }
  public orc: Race = {
    name: 'Ork', 
    baseWeight: 7,
    damageWithShield: 1,
    critChances: {baseCrit: 1, baseMaxCrit: 1.09, maxDamage: 1.27},
    skills: {stamina: 1.2, strength: 1.3, endurance: 1, initiative: 0.95, dodge: 0.7, learningCapacity: 0.9, luck: 1.05, discipline: 1.15},
    weaponSkills: {axe: 1.1, sword: 1, mace: 1.1, stave: 0.85, shield: 0.95, spear: 1, chain: 1.1}
  }
  public goblin: Race = {
    name: 'Goblin', 
    baseWeight: 2,
    damageWithShield: 0.85,
    critChances: {baseCrit: 1, baseMaxCrit: 1.08, maxDamage: 1.2},
    skills: {stamina: 0.85, strength: 1.2, endurance: 1, initiative: 1.1, dodge: 1.3, learningCapacity: 1, luck: 1.2, discipline: 1},
    weaponSkills: {axe: 1, sword: 0.9, mace: 1.2, stave: 1.15, shield: 1, spear: 1.2, chain: 1.1}
  }
  public troll: Race = {
    name: 'Troll', 
    baseWeight: 12,
    damageWithShield: 0.9,
    critChances: {baseCrit: 1, baseMaxCrit: 1.07, maxDamage: 1.24},
    skills: {stamina: 1.5, strength: 1.5, endurance: 0.8, initiative: 0.6, dodge: 0.4, learningCapacity: 0.8, luck: 1.15, discipline: 1.05},
    weaponSkills: {axe: 0.8, sword: 0.7, mace: 0.85, stave: 0.65, shield: 0.8, spear: 0.75, chain: 0.85}
  }
  public undead: Race = {
    name: 'Odöd', 
    baseWeight: 2,
    damageWithShield: 0.85,
    critChances: {baseCrit: 1.02, baseMaxCrit: 1.09, maxDamage: 1.2},
    skills: {stamina: 1.1, strength: 1, endurance: 2, initiative: 0.9, dodge: 1.05, learningCapacity: 0.6, luck: 0.8, discipline: 1.3},
    weaponSkills: {axe: 1.05, sword: 1.05, mace: 1.05, stave: 1.05, shield: 1.05, spear: 1.05, chain: 1.05}
  }
  public races: Race[] = [this.human, this.elf, this.dwarf, this.orc, this.goblin, this.troll, this.undead];
  
  public weaponSkills: string[] = ["Yxa", "Svärd", "Hammare", "Stav", "Stickvapen", "Kätting"]
  public headers: string[] = ["Grad", "KP", "SB", "UTH", "INI", "UA", "VF", "Sköld", "Inlärning", "Tur", "Disciplin", "Utplacerade Poäng"];

  private chosenRace: BehaviorSubject<string> = new BehaviorSubject<string>('');
  private chosenWeaponSkill: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor() { }

  setChosenRace(race: string) {
    this.chosenRace.next(race);
  }

  getChosenRace(): Observable<string> {
    return this.chosenRace.asObservable();
  }

  setChosenWeaponSkill(skill: string){
    this.chosenWeaponSkill.next(skill);
  }

  getChosenWeaponSkill(): Observable<string> {
    return this.chosenWeaponSkill.asObservable();
  }
}
