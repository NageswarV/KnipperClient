import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateReportFilterComponent } from './generate-report-filter.component';

describe('GenerateReportFilterComponent', () => {
  let component: GenerateReportFilterComponent;
  let fixture: ComponentFixture<GenerateReportFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenerateReportFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerateReportFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
