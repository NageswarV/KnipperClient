import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadReportFilterComponent } from './upload-report-filter.component';

describe('UploadReportFilterComponent', () => {
  let component: UploadReportFilterComponent;
  let fixture: ComponentFixture<UploadReportFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadReportFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadReportFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
