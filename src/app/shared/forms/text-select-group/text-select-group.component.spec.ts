import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextSelectGroupComponent } from './text-select-group.component';

describe('TextSelectGroupComponent', () => {
  let component: TextSelectGroupComponent;
  let fixture: ComponentFixture<TextSelectGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextSelectGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextSelectGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
