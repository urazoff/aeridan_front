import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';

@Component({
  selector: 'app-multiline-input',
  templateUrl: './multiline-input.component.html',
  styleUrls: ['./multiline-input.component.less']
})
export class MultilineInputComponent implements OnInit, AfterViewInit {
  @Input() placeholder: string;
  value = '';
  @Output() valueChanged: EventEmitter<string> = new EventEmitter<string>();
  @ViewChild('writeArea', {static: false}) writeArea;
  // @Input() textStyle: StyleSheet;
  constructor() { }
  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.writeArea.nativeElement.style.minHeight =  getComputedStyle(this.writeArea.nativeElement).lineHeight;
  }
  trimEmpty(event) {
    const trimmedText = event.target.textContent.trim();
    if (trimmedText === '') { event.target.textContent = ''; }
  }
  clearHTML(text: string) {
    const dict = {
      '<': '&lt;',
      '>': '&gt;'
    };

    Object.keys(dict).forEach((el) => {
      text = text.replace(new RegExp(el, 'gm'), dict[el]);
    });
    return text;
  }
  onInput(event) {
    try {
      this.trimEmpty(event);
      this.value = this.clearHTML(event.target.textContent);
      this.valueChanged.emit(this.value);
    } catch (e) {
      console.log(e);
    }
  }

}
