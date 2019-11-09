import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpoilerButtonComponent } from './spoiler-button.component';

describe('SpoilerButtonComponent', () => {
  let component: SpoilerButtonComponent;
  let fixture: ComponentFixture<SpoilerButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpoilerButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpoilerButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
