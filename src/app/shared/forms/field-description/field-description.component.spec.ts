import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldDescriptionComponent } from './field-description.component';

describe('FieldDescriptionComponent', () => {
  let component: FieldDescriptionComponent;
  let fixture: ComponentFixture<FieldDescriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FieldDescriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FieldDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
