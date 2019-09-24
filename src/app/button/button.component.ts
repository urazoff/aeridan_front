import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.less']
})
export class ButtonComponent implements OnInit {
  // @Input() label: string;
  @Output() onClick = new EventEmitter<MouseEvent>();
  constructor() { }

  ngOnInit() {
  }

  onClickButton(event) {
    this.onClick.emit(event);
  }

}
