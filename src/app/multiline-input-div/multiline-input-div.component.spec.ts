import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultilineInputDivComponent } from './multiline-input-div.component';

describe('MultilineInputDivComponent', () => {
  let component: MultilineInputDivComponent;
  let fixture: ComponentFixture<MultilineInputDivComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultilineInputDivComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultilineInputDivComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
