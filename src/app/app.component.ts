import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit{
  title: string;
  copyrightYear: number;
  copyrightName: string;
  
  constructor(){
    this.title = "Boulangerie de Polux";
    this.copyrightYear = new Date().getFullYear();
    this.copyrightName = "Sandric Courant";
  }
  ngOnInit(): void {
  }
}
