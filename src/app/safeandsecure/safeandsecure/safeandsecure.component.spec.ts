import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SafeandsecureComponent } from './safeandsecure.component';

describe('SafeandsecureComponent', () => {
  let component: SafeandsecureComponent;
  let fixture: ComponentFixture<SafeandsecureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SafeandsecureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SafeandsecureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
