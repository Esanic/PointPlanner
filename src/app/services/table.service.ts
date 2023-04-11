import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TableService {
  tableChange: Subject<any> = new Subject();

  constructor() { }

  setTable(change: any) {
    this.tableChange.next(change);
  }

  getTable(): Observable<any> {
    return this.tableChange.asObservable();
  }
}
