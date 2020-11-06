import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SideMenuSectionComponent } from './side-menu-section.component';

describe('SideMenuComponent', () => {
  let component: SideMenuSectionComponent;
  let fixture: ComponentFixture<SideMenuSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SideMenuSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SideMenuSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
