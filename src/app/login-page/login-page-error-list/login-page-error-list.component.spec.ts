import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginPageErrorListComponent } from './login-page-error-list.component';

describe('LoginPageErrorListComponent', () => {
  let component: LoginPageErrorListComponent;
  let fixture: ComponentFixture<LoginPageErrorListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginPageErrorListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginPageErrorListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
