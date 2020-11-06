import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateReportsListComponent } from './generate-reports-list.component';

describe('ReportsListComponent', () => {
  let component: GenerateReportsListComponent;
  let fixture: ComponentFixture<GenerateReportsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenerateReportsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerateReportsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
