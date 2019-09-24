import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WarningBlockComponent } from './warning-block.component';

describe('WarningBlockComponent', () => {
  let component: WarningBlockComponent;
  let fixture: ComponentFixture<WarningBlockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WarningBlockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WarningBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
