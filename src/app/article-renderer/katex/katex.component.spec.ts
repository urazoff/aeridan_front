import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KatexComponent } from './katex.component';

describe('LatexComponent', () => {
  let component: KatexComponent;
  let fixture: ComponentFixture<KatexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KatexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KatexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
