import {Component, Input, OnInit} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from "../../services/api.service";
import { PersonModel } from "../../models/persons.model";
import {Notify} from "notiflix/build/notiflix-notify-aio";

@Component({
  selector: 'app-person-modal',
  templateUrl: './person-modal.component.html',
  styleUrls: ['./person-modal.component.css']
})
export class PersonModalComponent implements OnInit {

  formValue !: FormGroup;
  personModelObj : PersonModel = new PersonModel();
  personData !: any;
  @Input() public showAdd !: boolean;
  @Input() public showUpdate !: boolean;
  constructor(private formbuilder: FormBuilder, private  api: ApiService) { }

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      firstName: [''],
      lastName: ['']
    })
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

  getAllPersons() {
    this.api.getPerson()
      .subscribe(res => {
        this.personData = res;
      })
  }
}
