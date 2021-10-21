import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public showAdd !: boolean;
  public showUpdate !: boolean;
  constructor() { }

  ngOnInit(): void {
  }

  clickAddPerson(){
  //  this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }
}
