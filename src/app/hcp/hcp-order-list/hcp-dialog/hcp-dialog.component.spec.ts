import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HcpDialogComponent } from './hcp-dialog.component';

describe('HcpDialogComponent', () => {
  let component: HcpDialogComponent;
  let fixture: ComponentFixture<HcpDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HcpDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HcpDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
