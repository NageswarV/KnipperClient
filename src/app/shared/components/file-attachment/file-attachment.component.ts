import { Component, OnInit, Input, ChangeDetectorRef, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormArray, FormGroup, Validators, FormControl } from '@angular/forms';
import { SortEvent } from '../responsive-datatable/table.model';
import { OnStringCompare, OnDateCompare, TableColumn } from '../responsive-datatable/table.model';
import { TranslationService, LocaleService } from 'angular-l10n';
import { DomSanitizer } from '@angular/platform-browser';
import { UserNamePipe } from '../../../shared/pipes';
import { ResponsiveDatatableComponent } from '../responsive-datatable/responsive-datatable.component';
import { FileUpload } from '../../../shared/service-clients/om-program';
import { Classification } from '../../../shared/service-clients/classification';
import { ClassificationValues } from '../../../common/classification-value';

export interface IAttachmentOptions {
  uploadTitle?: string;
  tableTitle: string;
  uploadButton: string;
  inputDescription: string;
  errorDescription: string;
  attachButton: string;
  noAttachments: string;
  buttonHeader?: string;
}

@Component({
  selector: 'samplicity-file-attachment',
  templateUrl: './file-attachment.component.html',
  styleUrls: ['./file-attachment.component.scss']
})
export class FileAttachmentComponent implements OnInit {
  @Input() options: IAttachmentOptions;
  @Input() parentForm: FormGroup;
  @Input() allowOverwrites: boolean;
  @Input() fileControlName = 'fileUpload';
  @Input() descControlName = 'fileDescription';
  @Input() userNamePipe: UserNamePipe;
  @Input() formArray: FormArray;
  @Input() highlightProp = 'newFlag';
  @Input() userAccessId = 0;
  @Input() canEdit = true;
  @Input() noFileUploadProperty = false;
  @Input() showCount = true;
  @Input() whiteBackground = false;
  @Input() allowDuplicateFileName = true;
  @Input() acceptsTypes: string[];
  
  @Output() onFileUpload: EventEmitter<FileUpload> = new EventEmitter();
  @ViewChild('table', {static : false}) table: ResponsiveDatatableComponent;

  count = 0;
  columns: TableColumn[];
  items: FileUpload[];

  _readonly = false;
  @Input('readonly') set readonly(value: boolean) {
    this._readonly = value;
  }
  get readonly(): boolean {
    return this._readonly;
  }

  _loading: boolean;
  @Input('loading') set loading(value: boolean) {
    this._loading = value;
    this.validateDescription();
  }
  get loading(): boolean {
    return this._loading;
  }

  get uploadTitle(): string {
    if (this.options.uploadTitle) {
      return this.options.uploadTitle;
    } else {
      return 'FileUpload.Title';
    }
  }

  get control(): FormControl {
    return this.parentForm.get(this.fileControlName) as FormControl;
  }

  constructor(
    private translationService: TranslationService,
    private sanitizer: DomSanitizer,
    private locale: LocaleService,
    private cd: ChangeDetectorRef
  ) {
  }

  ngOnInit(): void {
    this.setColumns();
    const isDisabled = this.parentForm.disabled;
    const fileUpload = new FormControl('');
    const fileDescription = new FormControl('');
    const fileAttachment = new FormControl('');
    this.parentForm.addControl(this.fileControlName, fileUpload);
    this.parentForm.addControl(this.descControlName, fileDescription);
    this.parentForm.addControl('fileAttachment', fileAttachment);
    if (isDisabled) {
      this.parentForm.disable();
    }
  }

  setColumns() {
    this.columns = [{
      name: 'fileDescription',
      displayName: 'FileUpload.Description',
      visibility: 'xs',
      customTemplate: true,
      sortFunc: this.sortFileDescription
    }, {
      name: 'fileName',
      displayName: 'FileUpload.Attachment',
      visibility: 'xs',
      customTemplate: true,
      sortFunc: this.sortFileName
    },  {
      name: 'creatorUserId',
      displayName: 'FileUpload.UploadedBy',
      customTemplate: true,
      visibility: 'xs',
      sortFunc: this.sortFileCreator.bind(this)
    }, {
      name: 'creationTime',
      displayName: 'FileUpload.DateAndTime',
      visibility: 'xs',
      customTemplate: true,
      sortDir: 'desc',
      sortFunc: this.sortCreationTime
    }];

    if(this.canEdit) {
      this.columns.push({
        name: 'deletedFlag',
        displayName: 'FileUpload.Actions',
        visibility: 'xs',
        sortEnabled: false,
        customTemplate: true
      });
    }
  }

  validateDescription() {
    const descriptionControl = this.parentForm.get('fileDescription');
    const attachmentControl = this.parentForm.get('fileAttachment');

    if (!descriptionControl || !attachmentControl) {
      return;
    }
    if (!descriptionControl.value || descriptionControl.value === '' || !attachmentControl.value || attachmentControl.value === '') {
      descriptionControl.setErrors({ 'serverValidation': this.translationService.translate(this.options.errorDescription) });
    } else {
      descriptionControl.setErrors({});
    }
  }

  sortFileDescription(a: FormGroup, b: FormGroup, event: SortEvent): number {
    // Determines if FormGroup has fileUpload as a property
    const fileUploadControlA = a.get('fileUpload');
    const fileUploadControlB = b.get('fileUpload');
    const descA: string = fileUploadControlA ? fileUploadControlA.value.fileDescription : a.get('fileDescription').value;
    const descB: string = fileUploadControlB ? fileUploadControlB.value.fileDescription : b.get('fileDescription').value;
    return OnStringCompare(descA, descB, event.sortDir);
  }

  sortFileName(a: FormGroup, b: FormGroup, event: SortEvent): number {
    const nameA: string = this.noFileUploadProperty ? a.get('fileName').value : a.get('fileUpload').value.fileName;
    const nameB: string = this.noFileUploadProperty ? b.get('fileName').value : b.get('fileUpload').value.fileName;
    return OnStringCompare(nameA, nameB, event.sortDir);
  }

  sortFileCreator(a: FormGroup, b: FormGroup, event: SortEvent): number {
    const nameA: string = this.userNamePipe.transform(a.get('creatorUserId').value, true);
    const nameB: string = this.userNamePipe.transform(b.get('creatorUserId').value, true);
    return OnStringCompare(nameA, nameB, event.sortDir);
  }

  sortCreationTime(a: FormGroup, b: FormGroup, event: SortEvent): number {
    const dateA: string = a.get('creationTime').value;
    const dateB: string = b.get('creationTime').value;
    return OnDateCompare(dateA, dateB, event.sortDir);
  }

  mapAttachment(formGroup: FormGroup): FileUpload {
    const newAttachment: FileUpload = new FileUpload;
    if (this.noFileUploadProperty) {
      newAttachment.fileName = formGroup.get('fileName').value;
      newAttachment.fileDescription = formGroup.get('fileDescription').value;
      newAttachment.fileDescription = formGroup.get('fileDescription').value;
    } else {
      const file = formGroup.get(this.fileControlName).value;
      newAttachment.fileName = file.fileName;
      newAttachment.fileDescription = file.fileDescription;
    }
    newAttachment.creationTime = formGroup.get('creationTime').value;
    newAttachment.creatorUserId = formGroup.get('creatorUserId').value;
    newAttachment.newFlag = formGroup.get('newFlag').value;
    newAttachment.location = formGroup.get('location').value;
    return newAttachment;
  }

  createAttachment(newAttachment: FileUpload) {
    this.onFileUpload.emit(newAttachment);
  }

  removeAttachment(index: number) {
    this.loading = true;
    this.cd.detectChanges();
    this.formArray.removeAt(index);
    this.formArray.markAsDirty();
    this.clearAttachment();
  }

  uploadAttachment(upload: FileUpload) {
    this.loading = true;
    this.formArray.markAsDirty();
    const attachControl = this.parentForm.get('fileAttachment');
    attachControl.setValidators(Validators.required);
    attachControl.updateValueAndValidity();
  }

  clearAttachment() {
    const attachmentControl = this.parentForm.get('fileAttachment');
    this.parentForm.get('fileUpload').setValue(null);
    attachmentControl.clearValidators();
    attachmentControl.updateValueAndValidity();
    this.loading = false;
  }

  get mitigationAttachmentType(): string{
    return ClassificationValues.OrderAttachmentType.Mitigation;
  }

  get srfAttachmentType(): string{
    return ClassificationValues.OrderAttachmentType.Srf;
  }

  get dorAttachmentType(): string{
    return ClassificationValues.OrderAttachmentType.Dor;
  }

  onDuplicateFileName() {
    this.loading = true;
    const attachControl = this.parentForm.get('fileAttachment');
    attachControl.setValidators(Validators.required);
    attachControl.updateValueAndValidity();
  }
}
