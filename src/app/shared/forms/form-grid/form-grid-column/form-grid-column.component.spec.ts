import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormGridColumnComponent } from './form-grid-column.component';

describe('FormGridColumnComponent', () => {
  let component: FormGridColumnComponent;
  let fixture: ComponentFixture<FormGridColumnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormGridColumnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormGridColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
