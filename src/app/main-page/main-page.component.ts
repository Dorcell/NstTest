import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  public showAdd: boolean = true;
  public showUpdate: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

  onModalOpen(res: boolean): void{
    this.showAdd = res;
    this.showUpdate = !res;
  }
}
