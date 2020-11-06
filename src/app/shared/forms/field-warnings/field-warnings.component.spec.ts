import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldWarningsComponent } from './field-warnings.component';

describe('FieldWarningsComponent', () => {
  let component: FieldWarningsComponent;
  let fixture: ComponentFixture<FieldWarningsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FieldWarningsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FieldWarningsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
