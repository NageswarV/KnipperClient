import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadedReportListComponent } from './uploaded-report-list.component';

describe('UploadedReportListComponent', () => {
  let component: UploadedReportListComponent;
  let fixture: ComponentFixture<UploadedReportListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadedReportListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadedReportListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
