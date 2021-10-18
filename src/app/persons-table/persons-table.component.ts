import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from "../shared/api.service";
import { PersonModel } from "./persons-table.model";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Report } from 'notiflix/build/notiflix-report-aio';
import { Confirm } from 'notiflix/build/notiflix-confirm-aio';
import { Loading } from 'notiflix/build/notiflix-loading-aio';
import { Block } from 'notiflix/build/notiflix-block-aio';

@Component({
  selector: 'app-persons-table',
  templateUrl: './persons-table.component.html',
  styleUrls: ['./persons-table.component.css']
})
export class PersonsTableComponent implements OnInit {

  formValue !: FormGroup;
  personModelObj : PersonModel = new PersonModel();
  personData !: any;
  showAdd !: boolean;
  showUpdate !: boolean;
  constructor(private formbuilder: FormBuilder, private  api: ApiService) { }

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      firstName: [''],
      lastName: ['']
    })
    this.getAllPersons();
  }

  clickAddPerson(){
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }

  postPersonDetails() {
    this.personModelObj.firstName = this.formValue.value.firstName;
    this.personModelObj.lastName = this.formValue.value.lastName;

    this.api.postPerson(this.personModelObj)
      .subscribe(res => {
          console.log(res);
          Notify.success("Сотрудник успешно добавлен");
          let ref = document.getElementById('cancel');
          ref?.click();
          this.formValue.reset();
          this.getAllPersons();
        },
        err => {
          Notify.failure("Ошибка!");
        })
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
    this.showAdd = false;
    this.showUpdate = true;
    this.personModelObj.id = row.id;
    this.formValue.controls['firstName'].setValue(row.firstName);
    this.formValue.controls['lastName'].setValue(row.lastName);
  }

  updatePersonDetails() {
    this.personModelObj.firstName = this.formValue.value.firstName;
    this.personModelObj.lastName = this.formValue.value.lastName;

    this.api.putPerson(this.personModelObj, this.personModelObj.id)
      .subscribe(res => {
          Notify.success("Сотрудник успешно обновлен")
          let ref = document.getElementById('cancel');
          ref?.click();
          this.formValue.reset();
          this.getAllPersons();
        },
        err => {
          Notify.failure("Ошибка!");
        })
  }
}
