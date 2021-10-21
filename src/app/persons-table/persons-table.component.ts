import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from "../shared/api.service";
import { PersonModel } from "./persons-table.model";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

@Component({
  selector: 'app-persons-table',
  templateUrl: './persons-table.component.html',
  styleUrls: ['./persons-table.component.css']
})
export class PersonsTableComponent implements OnInit {

  formValue !: FormGroup;
  personModelObj : PersonModel = new PersonModel();
  personData !: any;
  constructor(private formbuilder: FormBuilder, private  api: ApiService) { }

  ngOnInit(): void {
    this.getAllPersons();
  }

  getAllPersons() {
    this.api.getPerson()
      .subscribe(res => {
        this.personData = res;
      })
  }

  deletePerson(row : any) {
    this.api.deletePerson(row.id)
      .subscribe(res => {
          Notify.success('Сотрудник удален');
          this.getAllPersons();
        },
        err => {
          Notify.failure("Ошибка!");
        })
  }

  onEdit(row: any){
   // this.showAdd = false;
  //  this.showUpdate = true;
    this.personModelObj.id = row.id;
    this.formValue.controls['firstName'].setValue(row.firstName);
    this.formValue.controls['lastName'].setValue(row.lastName);
  }
}
