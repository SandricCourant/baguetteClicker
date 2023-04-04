import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-frame',
  templateUrl: './frame.component.html',
  styleUrls: ['./frame.component.css'],
})
export class FrameComponent implements OnInit {
  @Input() title: string = '';
  @Input() copyrightName: string = '';
  @Input() copyrightYear: number = 0;
  constructor() {}

  ngOnInit(): void {
  }
}
