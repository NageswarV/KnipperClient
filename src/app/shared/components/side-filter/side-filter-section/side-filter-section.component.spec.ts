import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SideFilterSectionComponent } from './side-filter-section.component';

describe('SideFilterSectionComponent', () => {
  let component: SideFilterSectionComponent;
  let fixture: ComponentFixture<SideFilterSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SideFilterSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SideFilterSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
