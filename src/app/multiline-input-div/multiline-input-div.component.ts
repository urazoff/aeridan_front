import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';

@Component({
  selector: 'app-multiline-input-div',
  templateUrl: './multiline-input-div.component.html',
  styleUrls: ['./multiline-input-div.component.less']
})
export class MultilineInputDivComponent implements OnInit, AfterViewInit {
  @Input() placeholder: string;
  @Input() value = '';
  @Output() valueChanged: EventEmitter<string> = new EventEmitter<string>();
  @ViewChild('writeArea', {static: false}) writeArea;
  lastSelectionStart = 0;
  lastSelectionEnd = 0;
  // @Input() textStyle: StyleSheet;
  constructor() { }
  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.writeArea.nativeElement.textContent = this.value;
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
  clearLineBreaks(text: string) {
    return text.replace('\n', '');
  }
  onInput(event) {
    try {
      this.trimEmpty(event);
      this.value = this.clearHTML(event.target.textContent);
      this.value = this.clearLineBreaks(this.value);
      this.valueChanged.emit(this.value);
    } catch (e) {
      console.log(e);
    }
  }
  onKeyDown(event) {
    if (event.key === 'Enter') {
      event.preventDefault();
    }
  }

}
