import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { Level } from 'src/app/models/level';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  public headers: string[] = this.global.headers;

  Object = Object;
  
  // public character = this.global.characterTemplate;
  public character: Level[] = []

  public desiredLevels: number = 26;

  public tableForm!: FormGroup;

  constructor(private global: GlobalService, private formBuilder: FormBuilder){
  }
  
  ngOnInit(): void {
    this.addLevels();
    this.createForm();
    this.data();

    /**
     * Subscribes to each level and upon change to an attribute it recieves that changes through the 'valueChanges' observable.
     * In order to iteriate through all the properties of the level Object.entries is used.
     * Checks to see that the attribute name is not "level" nor 'placedPoints'
     * Depending on the type of the attrbute (number or string, whereas string is the property is dirty), calculates the total.
     */
    this.tableFormArr.controls.forEach(control => {
      control.valueChanges.pipe(debounceTime(200)).subscribe(change => {
        let total = 0;
        Object.entries(change).forEach(attribute => {
          if(attribute[0] !== 'level' && attribute[0] !== 'placedPoints'){
            if(typeof attribute[1] === 'number'){
              total += attribute[1];
            }
            if(typeof attribute[1] === 'string'){
              total += +attribute[1];
            }
            control.get('placedPoints')?.setValue(total);
          }
        })
      })
    })
  }

  get tableFormArr(){
    return this.tableForm.controls['Rows'] as FormArray;
  }

  private createForm() {
    this.tableForm = this.formBuilder.group({
      Rows: this.formBuilder.array([])
    })
  }

  private data(){
    this.character.forEach((level) => {
      this.tableFormArr.push(this.addRow(level));
    })
  }

  private addLevels(){
    for(let i = 1; i < this.desiredLevels; i++){
      if(i === 1){
        this.character.push({level: i, stamina: 0, strength: 0, endurance: 0, initiative: 0, dodge: 0, learningCapacity: 0, luck: 0, discipline: 0, weaponSkill: 0, shield: 0, placedPoints: 0, maxPlacedPoints: 150});
      }
      else{
        this.character.push({level: i, stamina: 0, strength: 0, endurance: 0, initiative: 0, dodge: 0, learningCapacity: 0, luck: 0, discipline: 0, weaponSkill: 0, shield: 0, placedPoints: 0, maxPlacedPoints: 20});
      }
    }
  }

  private addRow(obj: any) {
    return this.formBuilder.group({
      level: [obj.level],
      stamina: [obj.stamina],
      strength: [obj.strength],
      endurance: [obj.endurance],
      initiative: [obj.initiative],
      dodge: [obj.dodge],
      learningCapacity: [obj.learningCapacity],
      luck: [obj.luck],
      discipline: [obj.discipline],
      weaponSkill: [obj.weaponSkill],
      shield: [obj.shield],
      placedPoints: [obj.placedPoints],
    });
  }

}
