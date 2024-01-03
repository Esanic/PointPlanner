import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { Level } from 'src/app/models/level';
import { Race } from 'src/app/models/race';
import { GlobalService } from 'src/app/services/global.service';
import { TableService } from 'src/app/services/table.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  public headers: string[] = this.global.headers;
  public character: Level[] = []
  public desiredLevels: number = 25+1;
  public tableForm!: FormGroup;

  public race: Race = this.global.defaultRace;
  public weaponSkill: string = '';
  public weaponSkillMultiplier: number = 1;

  public total = {level: 'Total', stamina: "0", strength: "0", endurance: "0", initiative: "0", dodge: "0", weaponSkill: "0", shield: "0", learningCapacity: "0", luck: "0", discipline: "0", placedPoints: "0"};
  public totalWithRaceBonus = {level: 'Total m. rasbonus', stamina: "0", strength: "0", endurance: "0", initiative: "0", dodge: "0", weaponSkill: "0", shield: "0", learningCapacity: "0", luck: "0", discipline: "0", placedPoints: "0"};
  private totals: any[] = [this.total, this.totalWithRaceBonus];

  Object = Object;

  constructor(private global: GlobalService, private formBuilder: FormBuilder, private tableService: TableService){}
  
  ngOnInit(): void {
    this.createForm();

    this.global.getChosenRace().subscribe(race => {
      this.racePicker(race);
      this.weaponSkillPicker(this.weaponSkill);
      this.totals.forEach(total => {
        this.summarizeEachColumn(total);
      })
    })
    
    this.global.getChosenWeaponSkill().subscribe(skill => {
      this.weaponSkill = skill;
      this.weaponSkillPicker(this.weaponSkill);
      this.totals.forEach(total => {
        this.summarizeEachColumn(total);
      })
    })
    
    this.addLevels();
    this.addData();
    this.subscribeToEachLevel();
  }

  get tableFormArr(){
    return this.tableForm.controls['Rows'] as FormArray;
  }

  private createForm() {
    this.tableForm = this.formBuilder.group({
      Rows: this.formBuilder.array([])
    })
  }

  private addLevels(){
    for(let i = 1; i < this.desiredLevels; i++){
      if(i === 1){
        this.character.push({
          level: i, stamina: 0, strength: 0, endurance: 0, initiative: 0, dodge: 0, weaponSkill: 0, shield: 0, learningCapacity: 0, luck: 0, discipline: 0, placedPoints: 0
          }
        );
      } else {
        this.character.push({
          level: i, stamina: 0, strength: 0, endurance: 0, initiative: 0, dodge: 0, weaponSkill: 0, shield: 0, learningCapacity: 0, luck: 0, discipline: 0, placedPoints: 0
        });
      }
    }
  }

  private addData(){
    this.character.forEach((level) => {
      this.tableFormArr.push(this.addLevel(level));
    })
  }

  private subscribeToEachLevel(){
    this.tableFormArr.controls.forEach(control => {
      control.valueChanges.pipe(debounceTime(200)).subscribe(rowThatChanged => {
        this.summarizeEachRow(rowThatChanged, control);
        this.totals.forEach(total => {
          this.summarizeEachColumn(total);
        })
        console.log(this.tableFormArr)
      })
    })
  }

  private summarizeEachRow(rowThatChanged: any, control: AbstractControl){
    let total = 0;

    Object.entries(rowThatChanged).forEach(attribute => {
      if(attribute[0] !== 'level' && attribute[0] !== 'placedPoints'){
        total += this.typeEvaluation(attribute);
      }
    })

    control.patchValue({placedPoints: total}, {emitEvent: false, onlySelf: true});
  }

  private summarizeEachColumn(total: any){
    if(total.level === 'Total'){
      let stamina: number = 0;
      let strength: number = 0;
      let endurance: number = 0;
      let initiative: number = 0;
      let dodge: number = 0;
      let learningCapacity: number = 0;
      let luck: number = 0;
      let discipline: number = 0;
      let weaponSkill: number = 0;
      let shield: number = 0;

      this.total = {level: 'Total', stamina: "0", strength: "0", endurance: "0", initiative: "0", dodge: "0", weaponSkill: "0", shield: "0", learningCapacity: "0", luck: "0", discipline: "0", placedPoints: ""};
      this.tableFormArr.controls.forEach(level => {
        Object.entries(level.value).forEach(attribute => {
          switch(attribute[0]){
            case 'stamina':
              stamina += this.typeEvaluation(attribute);
              this.total.stamina = stamina.toFixed();
              break;
            case 'strength':
              strength += this.typeEvaluation(attribute);
              this.total.strength = strength.toFixed();
              break;
            case 'endurance':
              endurance += this.typeEvaluation(attribute);
              this.total.endurance = endurance.toFixed();
              break;
            case 'initiative':
              initiative += this.typeEvaluation(attribute);
              this.total.initiative = initiative.toFixed();
              break;
            case 'dodge':
              dodge += this.typeEvaluation(attribute);
              this.total.dodge = dodge.toFixed();
              break;
            case 'learningCapacity':
              learningCapacity += this.typeEvaluation(attribute);
              this.total.learningCapacity = learningCapacity.toFixed();
              break;
            case 'luck':
              luck += this.typeEvaluation(attribute);
              this.total.luck = luck.toFixed();
              break;
            case 'discipline':
              discipline += this.typeEvaluation(attribute);
              this.total.discipline = discipline.toFixed();
              break;
            case 'weaponSkill':
              weaponSkill += this.typeEvaluation(attribute);
              this.total.weaponSkill = weaponSkill.toFixed();
              break;
            case 'shield':
              shield += this.typeEvaluation(attribute);
              this.total.shield = shield.toFixed();
              break;
          }
        })
      })
      this.total.placedPoints += (stamina + strength + endurance + initiative + dodge + weaponSkill + shield + learningCapacity + luck + discipline).toFixed();
    }
      
    if(total.level === 'Total m. rasbonus'){
      let stamina: number = 0;
      let strength: number = 0;
      let endurance: number = 0;
      let initiative: number = 0;
      let dodge: number = 0;
      let learningCapacity: number = 0;
      let luck: number = 0;
      let discipline: number = 0;
      let weaponSkill: number = 0;
      let shield: number = 0;

      this.totalWithRaceBonus = {level: 'Total m. rasbonus', stamina: "0", strength: "0", endurance: "0", initiative: "0", dodge: "0", weaponSkill: "0", shield: "0", learningCapacity: "0", luck: "0", discipline: "0", placedPoints: ""};
      
      this.tableFormArr.controls.forEach(level => {
        Object.entries(level.value).forEach(attribute => {
          switch(attribute[0]){
            case 'stamina':
              stamina += (this.typeEvaluation(attribute)*this.race.skills.stamina);
              this.totalWithRaceBonus.stamina = stamina.toFixed();
              break;
            case 'strength':
              strength += (this.typeEvaluation(attribute)*this.race.skills.strength);
              this.totalWithRaceBonus.strength = strength.toFixed();
              break;
            case 'endurance':
              endurance += (this.typeEvaluation(attribute)*this.race.skills.endurance);
              this.totalWithRaceBonus.endurance = endurance.toFixed();
              break;
            case 'initiative':
              initiative += (this.typeEvaluation(attribute)*this.race.skills.initiative);
              this.totalWithRaceBonus.initiative = initiative.toFixed();
              break;
            case 'dodge':
              dodge += (this.typeEvaluation(attribute)*this.race.skills.dodge);
              this.totalWithRaceBonus.dodge = dodge.toFixed();
              break;
            case 'learningCapacity':
              learningCapacity += (this.typeEvaluation(attribute)*this.race.skills.learningCapacity);
              this.totalWithRaceBonus.learningCapacity = learningCapacity.toFixed();
              break;
            case 'luck':
              luck += (this.typeEvaluation(attribute)*this.race.skills.luck);
              this.totalWithRaceBonus.luck = luck.toFixed();
              break;
            case 'discipline':
              discipline += (this.typeEvaluation(attribute)*this.race.skills.discipline);
              this.totalWithRaceBonus.discipline = discipline.toFixed();
              break;
            case 'weaponSkill':
              weaponSkill += this.typeEvaluation(attribute)*this.weaponSkillMultiplier;
              this.totalWithRaceBonus.weaponSkill = weaponSkill.toFixed();
              break;
            case 'shield':
              shield += (this.typeEvaluation(attribute)*this.race.weaponSkills.shield);
              this.totalWithRaceBonus.shield = shield.toFixed();
              break;
          }
        })
      })
  
      this.totalWithRaceBonus.placedPoints += (stamina + strength + endurance + initiative + dodge + weaponSkill + shield + learningCapacity + luck + discipline).toFixed();
    }
  }
  
  private typeEvaluation(attributeToEvaluate: any){
    if(typeof attributeToEvaluate[1] === 'string')
      return +attributeToEvaluate[1];

    if(typeof attributeToEvaluate[1] === 'number')
      return attributeToEvaluate[1];
    else
      return 0;
  }

  //Lägga till validation på placedPoints
  private addLevel(level: Level) {
    if(level.level === 1){
      return this.formBuilder.group({
        level: [level.level],
        stamina: [level.stamina],
        strength: [level.strength],
        endurance: [level.endurance],
        initiative: [level.initiative],
        dodge: [level.dodge],
        weaponSkill: [level.weaponSkill],
        shield: [level.shield],
        learningCapacity: [level.learningCapacity],
        luck: [level.luck],
        discipline: [level.discipline],
        placedPoints: [level.placedPoints, [Validators.max(150)]]
      })
    }
    else {
      return this.formBuilder.group({
        level: [level.level],
        stamina: [level.stamina],
        strength: [level.strength],
        endurance: [level.endurance],
        initiative: [level.initiative],
        dodge: [level.dodge],
        weaponSkill: [level.weaponSkill],
        shield: [level.shield],
        learningCapacity: [level.learningCapacity],
        luck: [level.luck],
        discipline: [level.discipline],
        placedPoints: [level.placedPoints, [Validators.max(20)]]
      })
    }
  }

  private racePicker(race: string){
    switch(race) {
      case 'Människa':
        this.race = this.global.human;
        break;
      case 'Alv':
        this.race = this.global.elf;
        break;
      case 'Dvärg':
        this.race = this.global.dwarf;
        break;
      case 'Ork':
        this.race = this.global.orc;
        break;
      case 'Goblin':
        this.race = this.global.goblin;
        break;
      case 'Troll':
        this.race = this.global.troll;
        break;
      case 'Odöd':
        this.race = this.global.undead;
    }


  }
  
  private weaponSkillPicker(weaponSkill: string){
    switch(weaponSkill){
      case 'Yxa':
        this.weaponSkillMultiplier = this.race.weaponSkills.axe;
        break;
      case 'Svärd':
        this.weaponSkillMultiplier = this.race.weaponSkills.sword;
        break;
      case 'Hammare':
        this.weaponSkillMultiplier = this.race.weaponSkills.mace;
        break;
      case 'Stav':
        this.weaponSkillMultiplier = this.race.weaponSkills.stave;
        break;
      case 'Stickvapen':
        this.weaponSkillMultiplier = this.race.weaponSkills.spear;
        break;
      case 'Kätting':
        this.weaponSkillMultiplier = this.race.weaponSkills.chain;  
    }
  }

  public buttonClick(){
    let arr: any[] = [];
    this.tableFormArr.controls.forEach(control => {
      let test = {
        level: control.value.level,
        attributes: {
          stamina: control.value.stamina,
          strength: control.value.strength,
          endurance: control.value.endurance,
          initiative: control.value.initiative,
          dodge: control.value.dodge,
          weaponSkill: control.value.weaponSkill,
          shield: control.value.shield,
          learningCapacity: control.value.learningCapacity,
          luck: control.value.luck,
          discipline: control.value.discipline,
        }
      }
      arr.push(test);
    })
    console.log(arr);
    console.log(JSON.stringify(arr));
  }
}
