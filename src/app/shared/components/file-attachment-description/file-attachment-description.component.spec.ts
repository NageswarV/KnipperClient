import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FileAttachmentDescriptionComponent } from './file-attachment-description.component';

describe('FileAttachmentDescriptionComponent', () => {
  let component: FileAttachmentDescriptionComponent;
  let fixture: ComponentFixture<FileAttachmentDescriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FileAttachmentDescriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileAttachmentDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
