import { Component, Input, forwardRef, EventEmitter, Output, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FileUpload } from '../../../../shared/service-clients/om-order';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { System } from '../../../../shared/service-clients/system';
import { ClientService } from '../../../../core/client.service';

@Component({
  selector: 'samplicity-file-input',
  templateUrl: './file-input.component.html',
  styleUrls: ['./file-input.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => FileInputComponent),
    multi: true
  }]
})
export class FileInputComponent implements OnInit, ControlValueAccessor {
  @Input() acceptsTypes: string[];
  @Input() buttonLabel: string;
  @Input() color: string = 'primary';
  @Input() allowOverwrites = true; //TODO Turn on once DNH and Mitigation Uploads are aligned 
  @Output() delete: EventEmitter<boolean> = new EventEmitter();
  @Output() upload: EventEmitter<boolean> = new EventEmitter();
  @Output() duplicateFileName: EventEmitter<boolean> = new EventEmitter();

  fileUpload: FileUpload;
  disabledState = false;
  loadingFile: boolean;

  get dataUrl(): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl('data:'
      + this.fileUpload.fileType
      + ';base64,' + this.fileUpload.base64FileContent);
  }

  constructor(
    private systemClient: System,
    private clientService: ClientService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
  }

  onChange = (inputItem: object) => { };
  onTouched = () => { };

  setFile(file: object): void {
    if (file['files'] && file['files'].length > 0) {
      if (!this.allowOverwrites) {
        const fileName = file['files'][0].name;
        const selectedClientId = this.clientService.getClientId();
        this.systemClient.checkIfFileNameExists(fileName, selectedClientId).subscribe((response) => {
          if (response && response.result) {
            // FileName Exists
            this.onDuplicateFileName(fileName);
          } else {
            this.loadFile(file);
          }
        });
      } else {
        this.loadFile(file);
      }
    }
  }

  private loadFile(file: object) {
    const fileUpload = new FileUpload();

    fileUpload.fileName = file['files'][0].name;

    const fileReader = new FileReader();
    this.loadingFile = true;
    fileReader.readAsDataURL(file['files'][0]);
    fileReader.onloadend = (readerEvent: any) => {
      this.loadingFile = false;

      fileUpload.base64FileContent = fileReader.result.toString().split(',')[1];
      fileUpload.fileType = file['files'][0].type;

      this.writeValue(fileUpload);
      this.onChange(fileUpload);
      this.upload.emit(true);
    };
  }

  onDeleteFile(): void {
    this.fileUpload.fileName = null;
    this.fileUpload.fileDescription = null;
    this.fileUpload.base64FileContent = null;
    this.fileUpload.duplicateFileName = false;
    this.writeValue(this.fileUpload);
    this.onChange(this.fileUpload);
    this.delete.emit(true);
  }

  onDuplicateFileName(fileName: string): void {
    this.fileUpload.fileName = fileName;
    this.fileUpload.fileDescription = null;
    this.fileUpload.base64FileContent = null;
    this.fileUpload.duplicateFileName = true;
    this.writeValue(this.fileUpload);
    this.onChange(this.fileUpload);
    this.duplicateFileName.emit(true);
  }

  writeValue(value: FileUpload): void {
    if (value) {
      this.fileUpload = value;
    } else {
      this.fileUpload = new FileUpload();
    }
  }

  registerOnChange(fn: (selected: object[] | string[]) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabledState = isDisabled;
  }
}
