import { Component, OnInit, ViewChild } from '@angular/core';
import {PersonsTableComponent} from "./persons-table/persons-table.component";
import {PersonModel} from "../models/persons.model";
import {PersonModalComponent} from "./person-modal/person-modal.component";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  @ViewChild(PersonsTableComponent) table!: PersonsTableComponent;
  @ViewChild(PersonModalComponent) modal!: PersonModalComponent;
  public showAdd: boolean = true;
  public showUpdate: boolean = false;
  public personDetails: PersonModel = new PersonModel();
  constructor() { }

  ngOnInit(): void {
  }

  onModalOpen(res: boolean): void{
    this.showAdd = res;
    this.showUpdate = !res;
  }

  onModalClosed(): void{
    this.table.getAllPersons();
  }

  fillDetails(row: any): void{
    this.personDetails = row;
    debugger;
    this.modal.formValue.controls['firstName'].setValue(row.firstName);
    this.modal.formValue.controls['lastName'].setValue(row.lastName);
  }
}
