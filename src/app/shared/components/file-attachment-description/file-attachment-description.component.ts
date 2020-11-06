import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef, ViewChild } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { FileUpload } from '../../../shared/service-clients/tenant';
import { FileInputWrapperComponent } from '../../../shared/forms/file-input-wrapper/file-input-wrapper.component';

@Component({
  selector: 'samplicity-file-attachment-description',
  templateUrl: './file-attachment-description.component.html',
  styleUrls: ['./file-attachment-description.component.scss']
})
export class FileAttachmentDescriptionComponent implements OnInit {
  @Input() acceptsTypes = '.jpg,.jpeg,.tiff,.tif,.png';
  @Input() allowOverwrites: boolean;
  @Input() title: string;
  @Input() fileControlName = 'fileUpload';
  @Input() descControlName = 'fileDescription';
  @Input() descMaxLength = 255;
  @Input() uploadButton: string;
  @Input() attachButton: string;
  @Input() parentFormGroup: FormGroup;
  @Input() descLabel: string;
  @Input() descRequired = true;
  @Input() userAccessId = 0;
  @Input() canEdit = true;
  @Input() duplicateFileNameMessage = 'FileUpload.DuplicateFileNameMessage';
  @Input() allowDuplicateFileName = true;
  @Input() attachments: any[] = [];
  @Input('readonly') set readonly(value: boolean) {
    this._readonly = value;
  }
  @Output() upload: EventEmitter<FileUpload> = new EventEmitter();
  @Output() duplicateFileName: EventEmitter<boolean> = new EventEmitter();
  @Output() delete: EventEmitter<boolean> = new EventEmitter();
  @Output() create: EventEmitter<FileUpload> = new EventEmitter();

  @ViewChild('inputWrapper', { static: false }) inputWrapper: FileInputWrapperComponent;

  loading: boolean;
  _readonly = false;
  isDuplicateFileName: boolean;
  isUploaded: boolean;

  get isImageUploaded(): boolean {
    return this.inputWrapper && this.inputWrapper.isUploaded;
  }

  get isImageDescriptionFilled(): boolean {
    const description: string = this.parentFormGroup.get(this.descControlName).value as string;
    if (description && description.length) {
      return description.trim().length > 0;
    } else {
      return false;
    }
  }

  get readonly(): boolean {
    return this._readonly;
  }

  get existingAttachments(): string[] {
    if (this.attachments != null) {
      return this.attachments.map(x => x.value.fileName ? x.value.fileName : x.value.fileUpload.fileName);
    }
    return null;
  }

  get showDuplicateNameError(): boolean{
    if (this.allowDuplicateFileName === true) { return false; }
    const attachment = this.parentFormGroup.get(this.fileControlName).value;
    if (attachment && this.attachments != null) {
      const fileName = attachment.fileName;
      if (fileName != null) {
        const duplicateFilename = this.attachments
          .find(x => x && ((x.value.fileUpload && x.value.fileUpload.fileName.toLowerCase() === fileName.toLowerCase()) 
          ||  (x.value.fileName && x.value.fileName.toLowerCase() === fileName.toLowerCase()) ));
        if (duplicateFilename) {
          return true;
        }
      }
    }
    return false;
  }

  constructor(
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit() {
  }


  createAttachment(): void {
    if (!this.isImageUploaded) {
      return;
    }
    this.cd.detectChanges();
    const newAttachment: FileUpload = this.parentFormGroup.get(this.fileControlName).value;
    const description: string = this.parentFormGroup.get(this.descControlName).value;
    newAttachment.fileDescription = description;
    newAttachment.creationTime = new Date();
    newAttachment.newFlag = true;
    if (this.userAccessId) {
      newAttachment.creatorUserId = this.userAccessId;
    }
    newAttachment.location = 'data:'
      + newAttachment.fileType
      + ';base64,' + newAttachment.base64FileContent;
    this.parentFormGroup.get(this.fileControlName).setValue(newAttachment);
    this.create.emit(newAttachment);
    this.clearAttachment();
  }


  clearAttachment(): void {
    this.isDuplicateFileName = false;
    this.parentFormGroup.get(this.fileControlName).setValue(null);
    this.parentFormGroup.get(this.fileControlName).updateValueAndValidity();
    const descriptionControl = this.parentFormGroup.get(this.descControlName);
    descriptionControl.setValue('');
    descriptionControl.clearValidators();
    descriptionControl.updateValueAndValidity();
    descriptionControl.markAsPristine();
    this.cd.detectChanges();
    this.loading = false;
    this.delete.emit(true);
  }

  onUpload(upload: FileUpload) {
    this.cd.detectChanges();
    this.isDuplicateFileName = false;
    if (this.descRequired) {
      const descriptionControl = this.parentFormGroup.get(this.descControlName);
      descriptionControl.setValidators(Validators.required);
      descriptionControl.updateValueAndValidity();
    }
    this.upload.emit(upload);
    this.cd.detectChanges();
  }

  onDuplicateFileName(): void {
    this.isDuplicateFileName = true;
    this.duplicateFileName.emit(true);
    this.cd.detectChanges();
  }
}
