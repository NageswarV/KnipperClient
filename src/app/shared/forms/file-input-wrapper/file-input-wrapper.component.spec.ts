import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FileInputWrapperComponent } from './file-input-wrapper.component';

describe('FileInputWrapperComponent', () => {
  let component: FileInputWrapperComponent;
  let fixture: ComponentFixture<FileInputWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FileInputWrapperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileInputWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
