import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { FormComponent } from '../../forms/form/form.component';
import { LocaleService } from 'angular-l10n';
import { TranslationService } from 'angular-l10n';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationComponent } from '../../../shared/components/notification/notification.component';
import { System } from '../../../shared/service-clients/system';
import { ClientService, Item } from '../../../core/client.service';

export interface IDetailOptions {
  createLink: string;
  createButton: string;
  saveButton?: string;
  saveButtonColor?: string;
  backButton?: string;
  rightButtonShow?: boolean;
  rightButton?: string;
  rightButtonIcon?: string;
  rightButtonColor?: string;
  rightButtonEvent?: EventEmitter<any>;
  title: string;
  createTitle: string;
  hideBreadcrumb?: boolean;
  menuBreadcrumb?: string;
  breadcrumb?: string;
  formTitle: string;
  objectName?: string;
  listLink?: string;
  discardLink?: string;
  detailNameProp?: string;
  alwaysShowSnackbar?: boolean;
}

@Component({
  selector: 'samplicity-detail-page',
  templateUrl: './detail-page.component.html',
  styleUrls: ['./detail-page.component.scss']
})
export class DetailPageComponent implements OnInit {
  private clientIdChangeKey = 'samplicity-dtp-changed-client';

  @ViewChild('form', { static: false }) form: FormComponent;
  @ViewChild('blackoutHoldNotificationWindow', { static: false }) blackoutHoldNotificationWindow: NotificationComponent;
  @Input() menuState: boolean;
  @Input() options: IDetailOptions;
  @Input() hideCreateButton = false;
  @Input() hideSaveButton = false;
  @Output() creatForm: EventEmitter<any> = new EventEmitter();
  @Output() save: EventEmitter<any> = new EventEmitter();
  @Output() reset: EventEmitter<any> = new EventEmitter();
  @Output() discard: EventEmitter<any> = new EventEmitter();
  @Output() navigate: EventEmitter<any> = new EventEmitter();

  get detailName(): string {
    if (this.form && this.form.formGroup) {
      const field = this.options.detailNameProp ?
        this.form.formGroup.get(this.options.detailNameProp) :
        this.form.formGroup.get(`names${this.locale.getCurrentLanguage()}`);
      if (field) {
        return field.value;
      }
    }
    return '';
  }

  get isCreatingNew(): boolean {
    return !this.form.itemId;
  }

  get isReadOnly(): boolean {
    return this.form.readonly;
  }

  get backButtonText(): string{
    return this.translationService.translate('Forms.Back') + this.translationService.translate(this.options.backButton);
  }

  constructor(
    private translationService: TranslationService,
    private router: Router,
    private route: ActivatedRoute,
    private locale: LocaleService,
    public clientService: ClientService,
    private systemService: System) {
  }

  disable() {
    this.form.hideSnackBar = true;
    this.form.readonly = true;
    this.form.disable('');
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (this.options.listLink && this.checkClientChange()) {
        this.router.navigate([this.options.listLink]);
      } else {
        this.form.itemId = params.id;
        this.creatForm.emit();
      }
    });

    this.loadBlackoutHoldBanner();
  }

  onDiscard() {
    if (this.options.discardLink) {
      this.router.navigate([this.options.discardLink + this.form.itemId]);
      this.onReset();
    } else if (this.options.listLink) {
      this.router.navigate([this.options.listLink], {
        queryParams: {
          discarded: this.translationService.translate(this.options.objectName)
        }
      });
    }
    this.discard.emit();
  }

  onCancel(message: string) {
    if (this.options.discardLink) {
      this.router.navigate([this.options.discardLink + this.form.itemId]);
      this.onReset();
    } else if (this.options.listLink) {
      this.router.navigate([this.options.listLink], {
        queryParams: {
          canceled: message
        }
      });
    }
    this.discard.emit();
  }

  onDelete() {
    this.router.navigate([this.options.listLink], {
      queryParams: {
        deleted: this.translationService.translate(this.options.objectName)
      }
    });
  }

  onReset() {
    this.reset.emit();
  }

  updateIfItemCreated(itemId: string) {
    if (this.isCreatingNew) {
      this.form.itemId = itemId;
      this.router.navigate([this.options.createLink, itemId],
      {
        queryParams: {
          created: true
        }
      });
    }
  }

  checkClientChange(): boolean {
    const clientId = JSON.parse(localStorage.getItem(this.clientIdChangeKey));

    if (clientId) {
      localStorage.setItem(this.clientIdChangeKey, JSON.stringify(false));
      return true;
    } else {
      return false;
    }
  }

  loadBlackoutHoldBanner(): void {
    this.systemService.getBlackoutHoldCount().subscribe(
      x => {
        if (x.result > 0) {
          const zipCodeMessage = this.translationService.translate('Notifications.BlackoutHold.BlackoutHoldBannerText1')
            .replace('{0}', x.result);
          const selectedClientId = this.clientService.getClientId();

          const messageList = [
            new Item('blackoutHold', zipCodeMessage),
            new Item(null, this.translationService.translate('Notifications.BlackoutHold.BlackoutHoldBannerText2')),
            new Item(['/' + selectedClientId + '/orders/', 'blackoutHolds'],
            this.translationService.translate('Notifications.BlackoutHold.BlackoutHoldBannerText3'))
          ];
          this.blackoutHoldNotificationWindow
            .displayInfoMessageWithLinks(messageList, 'Notifications.BlackoutHold.BlackoutHoldBannerTitle');
        } else {
          this.blackoutHoldNotificationWindow.removeAllMessages();
        }
      }
    );
  }
}
