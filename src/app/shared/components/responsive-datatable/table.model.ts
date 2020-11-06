export class TableColumn {
  name: string;
  subName?: string;
  displayName: string;
  replaceLabel?: string;
  subDisplayName?: string;
  visibility = 'xs';
  sortEnabled?: boolean;
  sortDir?: string;
  sortFunc?: (a, b, event: SortEvent) => number;
  selectAll?: boolean;
  pipe?: Object;
  pipeArg?: any;
  pipeArg2?: any;
  tableArg?: any;
  async?= false;
  linkRoute?: string;
  linkDisplay?: string;
  linkParam?: string;
  linkAnchorTarget?= '';
  customTemplate?: boolean;
  expandedRowTemplateDifferent?: boolean;
  headerParams?: any;
  errorProp?: string[];
  errorIcon?: string;
  warningProp?: string[];
  warningIcon?: string;
  successProp?: string[];
  linkPermission?: string;
  disableLink?: boolean;
  colonNotRequired?= false;
  waivedProp?: string[];
}

export interface ScrollPosition {
  sH: number;
  sT: number;
  cH: number;
}

export interface TableLoadEvent {
  pageNum: number;
  perPage: number;
  sort?: SortEvent;
}

export interface SortEvent {
  sortDir?: string;
  sortName: string;
}

export interface TableDto {
  items: any[];
  totalCount: number;
}

export function OnStringCompare(a: string, b: string, sortDir: string): number {
  let compare = 0;
  a = a ? a.toString().toUpperCase() : '';
  b = b ? b.toString().toUpperCase() : '';
  if (a > b) {
    compare = 1;
  } else if (a < b) {
    compare = -1;
  }
  return (sortDir === 'asc' ? compare : -compare);
}

export function OnDateCompare(a: string, b: string, sortDir: string): number {
  let compare = 0;
  if (a > b) {
    compare = 1;
  } else if (a < b) {
    compare = -1;
  }
  return (sortDir === 'asc' ? compare : -compare);
}

export function OnDateObjectCompare(a: Date, b: Date, sortDir: string): number {
  let compare = 0;
  if (a > b) {
    compare = 1;
  } else if (a < b) {
    compare = -1;
  }
  return (sortDir === 'asc' ? compare : -compare);
}
