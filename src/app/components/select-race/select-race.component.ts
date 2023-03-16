import { Component } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'select-race',
  templateUrl: './select-race.component.html',
  styleUrls: ['./select-race.component.css']
})
export class SelectRaceComponent {
  public races: string[] = this.global.races.map(race => race.name);

  constructor(private global: GlobalService){}

}
