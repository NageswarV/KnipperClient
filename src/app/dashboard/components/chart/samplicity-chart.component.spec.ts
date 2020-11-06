import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SamplicityChartComponent } from './samplicity-chart.component';

describe('SamplicityChartComponent', () => {
  let component: SamplicityChartComponent;
  let fixture: ComponentFixture<SamplicityChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SamplicityChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SamplicityChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
