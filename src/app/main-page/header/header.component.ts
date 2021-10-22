import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output() public showAdd = new EventEmitter<boolean>();
  constructor() { }

  ngOnInit(): void {
  }

  public clickAddPerson(){
    this.showAdd.emit(true);
  }
}
