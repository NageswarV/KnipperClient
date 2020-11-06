import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { FieldBaseComponent } from '../field-base/field-base.component';

@Component({
  selector: 'samplicity-file-input-wrapper',
  templateUrl: './file-input-wrapper.component.html',
  styleUrls: ['./file-input-wrapper.component.scss']
})
export class FileInputWrapperComponent extends FieldBaseComponent implements OnInit, AfterViewInit {

  @Input() acceptsTypes: string[];
  @Input() allowOverwrites: boolean;
  @Input() buttonLabel: string;
  @Input() color: string;
  @Input() existingAttachments: string[] = [];
  @Output() upload: EventEmitter<boolean> = new EventEmitter();
  @Output() delete: EventEmitter<boolean> = new EventEmitter();
  @Output() duplicateFileName: EventEmitter<boolean> = new EventEmitter();

  _isUploaded: boolean;

  get showDuplicateNameError(): boolean{
    const attachment = this.control.value;
    if (attachment && this.existingAttachments != null) {
      const fileName = attachment.fileName;
      if (fileName != null) {
        const duplicateFilename = this.existingAttachments
          .find(x => x && x.toLowerCase() === fileName.toLowerCase());
        if (duplicateFilename) {
          return true;
        }
      }
    }
    return false;
  }

  get isUploaded(): boolean {
    return this._isUploaded;
  }

  constructor() {
    super();
  }

  ngOnInit() {
    this.control.valueChanges.subscribe((value) => {
      this._isUploaded = (value && !value.duplicateFileName);
    });
  }

  ngAfterViewInit() {
    if (this.control.value && !this.control.value.duplicateFileName) {
      this._isUploaded = true;
    }
  }

  onDeleteFile(): void {
    this.delete.emit(true);
  }

  onUploadFile(): void {
    this.upload.emit(true);
  }

  onDuplicateFileName(): void {
    this.duplicateFileName.emit(true);
  }
}
