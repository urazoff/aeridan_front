import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginCallbackPageComponent } from './login-callback-page.component';

describe('LoginCallbackPageComponent', () => {
  let component: LoginCallbackPageComponent;
  let fixture: ComponentFixture<LoginCallbackPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginCallbackPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginCallbackPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
