import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormPrimaryWellComponent } from './form-primary-well.component';

describe('FormPrimaryWellComponent', () => {
  let component: FormPrimaryWellComponent;
  let fixture: ComponentFixture<FormPrimaryWellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormPrimaryWellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormPrimaryWellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
