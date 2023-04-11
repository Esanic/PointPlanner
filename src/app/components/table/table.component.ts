import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Subscription, debounceTime } from 'rxjs';
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
  public desiredLevels: number = 26;
  public tableForm!: FormGroup;

  public race!: Race;


  public total = {level: 'Total', stamina: 0, strength: 0, endurance: 0, initiative: 0, dodge: 0, weaponSkill: 0, shield: 0, learningCapacity: 0, luck: 0, discipline: 0, placedPoints: 0};
  public totalWithRaceBonus = {level: 'Total m. rasbonus', stamina: 0, strength: 0, endurance: 0, initiative: 0, dodge: 0, weaponSkill: 0, shield: 0, learningCapacity: 0, luck: 0, discipline: 0, placedPoints: 0};

  Object = Object;

  constructor(private global: GlobalService, private formBuilder: FormBuilder, private tableService: TableService){}
  
  ngOnInit(): void {
    this.addLevels();
    this.createForm();
    this.addData();
    this.subscribeToEachLevel();
  }

  get tableFormArr(){
    return this.tableForm.controls['Rows'] as FormArray;
  }

  private addLevels(){
    for(let i = 1; i < this.desiredLevels; i++){
      if(i === 1){
        this.character.push({level: i, stamina: 0, strength: 0, endurance: 0, initiative: 0, dodge: 0, weaponSkill: 0, shield: 0, learningCapacity: 0, luck: 0, discipline: 0, placedPoints: 0, maxPlacedPoints: 150});
      }
      else{
        this.character.push({level: i, stamina: 0, strength: 0, endurance: 0, initiative: 0, dodge: 0, weaponSkill: 0, shield: 0, learningCapacity: 0, luck: 0, discipline: 0, placedPoints: 0, maxPlacedPoints: 20});
      }
    }
  }

  private createForm() {
    this.tableForm = this.formBuilder.group({
      Rows: this.formBuilder.array([])
    })
  }

  private addData(){
    this.character.forEach((level) => {
      this.tableFormArr.push(this.addRow(level));
    })
  }


  private subscribeToEachLevel(){
    this.tableFormArr.controls.forEach(control => {
      control.valueChanges.pipe(debounceTime(200)).subscribe(change => {
        // this.tableService.setTable(this.tableFormArr);
        this.summarizeEachRow(change, control);
        this.summarizeEachColumn();
      })
    })
  }

  private summarizeEachRow(change: any, control: AbstractControl){
    let total = 0;

    Object.entries(change).forEach(attribute => {
      if(attribute[0] !== 'level' && attribute[0] !== 'placedPoints'){
        total += this.typeEvaluation(attribute);
        control.get('placedPoints')?.setValue(total, {emitevent: false, onlySelf: true});
      }
    })
  }

  private summarizeEachColumn(){
    this.total = {level: 'Total', stamina: 0, strength: 0, endurance: 0, initiative: 0, dodge: 0, weaponSkill: 0, shield: 0, learningCapacity: 0, luck: 0, discipline: 0, placedPoints: 0};

    this.tableFormArr.controls.forEach(level => {
      Object.entries(level.value).forEach(attribute => {
        switch(attribute[0]){
          case 'stamina':
            this.total.stamina += this.typeEvaluation(attribute);
            break;
          case 'strength':
            this.total.strength += this.typeEvaluation(attribute);
            break;
          case 'endurance':
            this.total.endurance += this.typeEvaluation(attribute);
            break;
          case 'initiative':
            this.total.initiative += this.typeEvaluation(attribute);
            break;
          case 'dodge':
            this.total.dodge += this.typeEvaluation(attribute);
            break;
          case 'learningCapacity':
            this.total.learningCapacity += this.typeEvaluation(attribute);
            break;
          case 'luck':
            this.total.luck += this.typeEvaluation(attribute);
            break;
          case 'discipline':
            this.total.discipline += this.typeEvaluation(attribute);
            break;
          case 'weaponSkill':
            this.total.weaponSkill += this.typeEvaluation(attribute);
            break;
          case 'shield':
            this.total.shield += this.typeEvaluation(attribute);
            break;
        }
      })
    })

    this.total.placedPoints += this.total.stamina + this.total.strength + this.total.endurance + this.total.initiative + this.total.dodge + this.total.weaponSkill + this.total.shield + this.total.learningCapacity + this.total.luck + this.total.discipline;
  }
  
  private typeEvaluation(attributeToEvaluate: any){
    if(typeof attributeToEvaluate[1] === 'string')
      return +attributeToEvaluate[1];

    if(typeof attributeToEvaluate[1] === 'number')
      return attributeToEvaluate[1];
    else
      return 0;
  }

  private addRow(obj: any) {
    return this.formBuilder.group({
      level: [obj.level],
      stamina: [obj.stamina],
      strength: [obj.strength],
      endurance: [obj.endurance],
      initiative: [obj.initiative],
      dodge: [obj.dodge],
      weaponSkill: [obj.weaponSkill],
      shield: [obj.shield],
      learningCapacity: [obj.learningCapacity],
      luck: [obj.luck],
      discipline: [obj.discipline],
      placedPoints: [obj.placedPoints],
    });
  }

}
