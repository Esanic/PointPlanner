import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'select-weapon-skill',
  templateUrl: './select-weapon-skill.component.html',
  styleUrls: ['./select-weapon-skill.component.css']
})
export class SelectWeaponSkillComponent {
  public chooseWeaponSkill = new FormControl('');
  public weaponSkills: string[] = this.global.weaponSkills;

  constructor(private global: GlobalService){
    this.chooseWeaponSkill.valueChanges.subscribe(weaponSkill => {
      if(weaponSkill)
        this.global.setChosenWeaponSkill(weaponSkill);
    })
  }

}
