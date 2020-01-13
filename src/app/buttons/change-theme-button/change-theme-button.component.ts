import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-change-theme-button',
  templateUrl: './change-theme-button.component.html',
  styleUrls: ['./change-theme-button.component.less']
})
export class ChangeThemeButtonComponent implements OnInit {
  @Output() change = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

}
