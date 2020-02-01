import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ThemeService} from '../../_services/theme.service';

@Component({
  selector: 'app-change-theme-button',
  templateUrl: './change-theme-button.component.html',
  styleUrls: ['./change-theme-button.component.less']
})
export class ChangeThemeButtonComponent implements OnInit {
  constructor(public theme: ThemeService) { }

  ngOnInit() {
  }

  changeTheme() {
    this.theme.swapTheme();
  }
}
