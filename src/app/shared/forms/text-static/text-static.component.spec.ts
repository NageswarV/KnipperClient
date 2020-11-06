import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextStaticComponent } from './text-static.component';

describe('TextStaticComponent', () => {
  let component: TextStaticComponent;
  let fixture: ComponentFixture<TextStaticComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextStaticComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextStaticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
