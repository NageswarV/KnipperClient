import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextInlineInputComponent } from './text-inline-input.component';

describe('TextInlineInputComponent', () => {
  let component: TextInlineInputComponent;
  let fixture: ComponentFixture<TextInlineInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TextInlineInputComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextInlineInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
