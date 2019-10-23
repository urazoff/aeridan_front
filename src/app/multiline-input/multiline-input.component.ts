import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';

@Component({
  selector: 'app-multiline-input',
  templateUrl: './multiline-input.component.html',
  styleUrls: ['./multiline-input.component.less']
})
export class MultilineInputComponent implements OnInit {
  @Input() placeholder: string;
  @Input() value = '';
  @Output() valueChanged: EventEmitter<string> = new EventEmitter<string>();
  @ViewChild('writeArea', {static: false}) writeArea;
  // @Input() textStyle: StyleSheet;
  constructor() { }
  ngOnInit(): void {
  }
  trimEmpty(event) {
    const trimmedText = event.target.value.trim();
    if (trimmedText === '') { event.target.value = ''; }
  }

  onInput(event) {
    try {
      this.trimEmpty(event);
      this.valueChanged.emit(this.value);
    } catch (e) {
      console.log(e);
    }
  }


}
