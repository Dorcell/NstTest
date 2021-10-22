import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { ApiService } from "../../services/api.service";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

@Component({
  selector: 'app-persons-table',
  templateUrl: './persons-table.component.html',
  styleUrls: ['./persons-table.component.css']
})
export class PersonsTableComponent implements OnInit {

  public personData !: any;
  @Output() public showAdd = new EventEmitter<boolean>();
  @Output() public personDetails = new EventEmitter<any>();
  constructor(private  api: ApiService) { }

  ngOnInit(): void {
    this.getAllPersons();
  }

  public getAllPersons() {
    this.api.getPerson()
      .subscribe(res => {
        this.personData = res;
      })
  }

  public deletePerson(row : any) {
    this.api.deletePerson(row.id)
      .subscribe(res => {
          Notify.success('Сотрудник удален');
          this.getAllPersons();
        },
        err => {
          Notify.failure("Ошибка!");
        })
  }

  public onEdit(row: any){
    this.showAdd.emit(false);
    this.personDetails.emit(row);
  }
}
