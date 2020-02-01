import { Component, OnInit } from '@angular/core';
import {ThemeService} from '../_services/theme.service';

@Component({
  selector: 'app-panel-top',
  templateUrl: './panel-top.component.html',
  styleUrls: ['./panel-top.component.less']
})
export class PanelTopComponent implements OnInit {

  constructor(public theme: ThemeService) { }

  ngOnInit() {
  }

}
