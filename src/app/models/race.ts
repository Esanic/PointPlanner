import { CritChances } from "./crit-chances";

import { Skill } from "./skill";
import { WeaponSkills } from "./weapon-skills";

export class Race {
    public name: string;
    public baseWeight: number;
    public damageWithShield: number;
    public critChances: CritChances;
    public skills: Skill;
    public weaponSkills: WeaponSkills;

    constructor(name: string, baseWeight: number, damageWithShield: number, critChances: CritChances, skills: Skill, weaponSkills: WeaponSkills){
        this.name = name;
        this.baseWeight = baseWeight;
        this.damageWithShield = damageWithShield;
        this.critChances = critChances
        this.skills = skills;
        this.weaponSkills = weaponSkills;
    }
}
