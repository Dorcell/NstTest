import {Component, Input, Output, OnInit, EventEmitter} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from "../../services/api.service";
import { PersonModel } from "../../models/persons.model";
import { Notify } from "notiflix/build/notiflix-notify-aio";

@Component({
  selector: 'app-person-modal',
  templateUrl: './person-modal.component.html',
  styleUrls: ['./person-modal.component.css']
})
export class PersonModalComponent implements OnInit {

  public formValue !: FormGroup;
  private personModelObj = new PersonModel();
  @Input() public showAdd !: boolean;
  @Input() public showUpdate !: boolean;
  @Input() public person!: PersonModel;
  @Output() public refreshTable = new EventEmitter<boolean>();
  constructor(private formbuilder: FormBuilder, private  api: ApiService) { }

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      firstName: [''],
      lastName: ['']
    })
  }

  public postPersonDetails() {
    let firstName = this.formValue.value.firstName;
    let lastName = this.formValue.value.lastName;
    if (this.isEmptyOrSpaces(firstName) || this.isEmptyOrSpaces(lastName)){
      Notify.failure("Имя или фамилия не может быть пустым");
      return;
    }

    this.personModelObj.firstName = firstName;
    this.personModelObj.lastName = lastName;

    this.api.postPerson(this.personModelObj)
      .subscribe(res => {
          console.log(res);
          Notify.success("Сотрудник успешно добавлен");
          let ref = document.getElementById('cancel');
          ref?.click();
          this.formValue.reset();
          this.refreshTable.emit();
        },
        err => {
          Notify.failure("Ошибка!");
        })
  }

  public updatePersonDetails() {
    debugger;
    let firstName = this.formValue.value.firstName;
    let lastName = this.formValue.value.lastName;
    if (this.isEmptyOrSpaces(firstName) || this.isEmptyOrSpaces(lastName)){
      Notify.failure("Имя или фамилия не может быть пустым");
      return;
    }

    this.personModelObj.id = this.person.id;
    this.personModelObj.firstName = firstName;
    this.personModelObj.lastName = lastName;

    this.api.putPerson(this.personModelObj, this.personModelObj.id)
      .subscribe(res => {
          Notify.success("Сотрудник успешно обновлен")
          let ref = document.getElementById('cancel');
          ref?.click();
          this.formValue.reset();
          this.refreshTable.emit();
        },
        err => {
          Notify.failure("Ошибка!");
        })
  }

  private isEmptyOrSpaces(row: string): boolean{
    return row === null || row.match(/^ *$/) !== null;
  }

  public clearDetails(): void{
    this.formValue.reset();
  }
}
