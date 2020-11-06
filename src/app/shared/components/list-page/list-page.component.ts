import { Component, OnInit, ViewChild, Input, ContentChild, TemplateRef, EventEmitter, AfterViewInit, Output } from '@angular/core';
import { NotificationComponent } from '../../../shared/components/notification/notification.component';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ResponsiveDatatableComponent } from '../responsive-datatable/responsive-datatable.component';
import { TableColumn, SortEvent, TableLoadEvent } from '../responsive-datatable/table.model';
import { Observable } from 'rxjs/Observable';
import { TranslationService } from 'angular-l10n';
import { FilterService } from '../../../core/filter.service';

export interface IListOptions {
  rightButtonShow?: boolean;
  rightButton?: string;
  rightButtonIcon?: string;
  rightButtonColor?: string;
  rightButtonDisabled?: boolean;
  rightButtonEvent?: EventEmitter<any>;
}

@Component({
  selector: 'samplicity-list-page',
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.scss']
})
export class ListPageComponent implements OnInit, AfterViewInit {
  private clientIdChangeKey = 'samplicity-dtp-changed-client';

  @ViewChild('table', {static:false}) table: ResponsiveDatatableComponent;
  @ViewChild('notificationWindow', { static: false }) notificationWindow: NotificationComponent;
  @ContentChild(TemplateRef, { static: false }) cellTemplate: TemplateRef<any>;

  @Input() filterForm: FormGroup;
  @Input() columns: TableColumn[];
  @Input() items: any[];
  @Input() loadMore: (loadEvent: TableLoadEvent) => Observable<any>;
  @Input() delayedLoadMore: boolean;
  @Input() createLink: string;
  @Input() createBtnText: string;
  @Input() createLinkPermission: string;
  @Input() pageTitle: string;
  @Input() stickyResetItem: string;
  @Input() breadcrumbText: string;
  @Input() options: IListOptions[];
  @Input() displayColumns: TableColumn[];
  @Input() hightlightProp = 'highlight';
  @Input() createLinkVisible = true;
  @Input() hideCreateButton = false;
  @Input() defaultFilterValues: Object;
  @Input() selectEnabled = false;
  @Input() selectColumn: TableColumn;
  @Input() disableSelectSorting: boolean;
  @Input() itemSelectableProp;
  @Output() selectEvent: EventEmitter<object[]> = new EventEmitter<object[]>();

  searchForm: FormGroup;
  tableCountDisplay: string;
  scrollToTopRequired: boolean = false;

  constructor(
    private translationService: TranslationService,
    private filterService: FilterService,
    private route: ActivatedRoute,
    fb: FormBuilder) {

    this.searchForm = fb.group({
      search: ['']
    });
  }

  ngOnInit() {
    this.initFilter();

    this.route.queryParams.subscribe(params => {
      if (params.discarded) {
        this.notificationWindow.displayInfoMessage(
          this.translationService.translate('Notifications.ChangesDiscardedSuccess').replace('$0', params.discarded),
          'Notifications.InfoTitleDefault'
        );
        this.scrollToTopRequired = true;
      }
      if (params.deleted) {
        this.notificationWindow.displaySuccessMessage(
          this.translationService.translate('Notifications.DeletedSuccess').replace('$0', params.deleted),
          'Notifications.SuccessTitleDefault'
        );
        this.scrollToTopRequired = true;
      }
      if (params.canceled) {
        this.notificationWindow.displaySuccessMessage(
          this.translationService.translate('Notifications.CanceledSuccess').replace('$0', params.canceled),
          'Notifications.SuccessTitleDefault'
        );
        this.scrollToTopRequired = true;
      }
      this.setClientChange();
    });

    const hasColumnPermissions = this.columns.some(x => !!(x.linkPermission));
  }

  ngAfterViewInit(): void {
    if (this.scrollToTopRequired) {
      this.scrollToTop();
    }
  }

  scrollToTop(): void {
    const sidenav = document.querySelector('.mat-sidenav-content');
    sidenav ? sidenav.scrollTo(0, 0) : window.scrollTo(0, 0);
    this.scrollToTopRequired = false;
  }

  initFilter(): void {
    if (this.filterService.hasFilter(this.pageTitle)) {
      const filterValue = this.filterService.loadFilter(this.pageTitle);
      if (Object.keys(filterValue).length > 0) {
      this.filterForm.setValue(filterValue);
      } else {
        this.filterForm.reset();
      }
    } else {
      this.filterForm.reset();
    }
  }

  getFilterValue(name: string): any {
    const field = this.filterForm.get(name);
    if (field) {
      return field.value;
    }
    return null;
  }

  hasFilter(): boolean {
    return this.filterService.hasFilter(this.pageTitle);
  }

  getSearchValue(): string {
    const field = this.searchForm.get('search');
    if (field) {
      return field.value;
    }
    return '';
  }

  doSearch() {
    if (this.displayColumns) {
      this.columns = this.displayColumns;
    }
    if (this.filterForm.valid && this.searchForm.valid) {
      this.filterService.saveFilter(this.pageTitle, this.filterForm.getRawValue());
      this.notificationWindow.removeMessage();
      this.table.triggerLoadData();
    }
  }

  getSelectedItems() {
    return this.table.getSelectedItems();
  }

  onClearFilter(stickyItem?: string) {
    let stickyValue: any;
    this.filterService.clearFilter(this.pageTitle);
    if (stickyItem != null) {
      stickyValue = this.filterForm.get(stickyItem).value;
    }
    this.filterForm.reset();
    if (this.defaultFilterValues) {
      Object.keys(this.defaultFilterValues).forEach((key) => {
        this.filterForm.get(key).setValue(this.defaultFilterValues[key]);
      });
    }
    if (stickyValue != null) {
      this.filterForm.get(stickyItem).setValue(stickyValue);
    }
    this.table.triggerLoadData();
  }

  onToggleFilter(toggle: boolean) {
    this.filterService.toggleFilter(toggle);
  }

  setClientChange(): void {
    localStorage.setItem(this.clientIdChangeKey, JSON.stringify(false));
  }

  onSelect(selectedItems): void {
    this.selectEvent.emit(selectedItems);
  }
}
