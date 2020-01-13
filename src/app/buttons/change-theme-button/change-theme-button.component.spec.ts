import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeThemeButtonComponent } from './change-theme-button.component';

describe('ChangeThemeButtonComponent', () => {
  let component: ChangeThemeButtonComponent;
  let fixture: ComponentFixture<ChangeThemeButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeThemeButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeThemeButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
