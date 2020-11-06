import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeintDialogComponent } from './recipeint-dialog.component';

describe('RecipeintDialogComponent', () => {
  let component: RecipeintDialogComponent;
  let fixture: ComponentFixture<RecipeintDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecipeintDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeintDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
