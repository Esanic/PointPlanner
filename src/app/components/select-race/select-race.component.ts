import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'select-race',
  templateUrl: './select-race.component.html',
  styleUrls: ['./select-race.component.css']
})
export class SelectRaceComponent {
  public chooseRace = new FormControl('');
  public races: string[] = this.global.races.map(race => race.name);


  constructor(private global: GlobalService){
    this.chooseRace.valueChanges.subscribe(race => {
      if(race)
        this.global.setChosenRace(race);
    })
  }

}
