import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IMyOptions } from 'mydatepicker';


/**
 * The NgbTreeview a simple way to create tree view in html.
 */
@Component({
  selector: 'sg-tree-view',
  templateUrl: './sg-tree-view.component.html',
  styleUrls: ['./sg-tree-view.component.scss']
})

export class SgTreeViewComponent implements OnInit {
  private _collapseAll: boolean;
  private _selectAll: boolean;

  public nodes: any[] = [];
  public collapseAttr: string = 'isCollapsed';
  public selectAttr: string = 'isSelected';
  public inDeterminateAttr: string = 'isIndeterminate';
  public startDate: string = 'startDate';
  public endDate: string = 'endDate';
  public date = new Date();

  datePickerOptions: IMyOptions = {
    dateFormat: 'mm/dd/yyyy',
    height: '45px',
    selectionTxtFontSize: '15px',
    showClearDateBtn: true,
    disableUntil: { year: this.date.getFullYear(), month: this.date.getMonth() + 1, day: this.date.getDate() - 1 },
    editableDateField: false,
    inline: false
  };

  /**
   * Providen data for tree.
   */
  @Input('data') data: any[];

  /**
   * A flag indicating data is flatten in array and prepare is required.(Default
   * is true).
   */
  @Input('prepareData') prepareData: boolean = true;

  /**
   * Name of ID property in input data.
   */
  @Input('idAttr') idAttr: any;

  /**
   * Name of parent property in input data.
   */
  @Input('parentAttr') parentAttr: any;


  /**
   * Name of children list property in input data.
   */
  @Input('childrenAttr') childrenAttr: string = 'CHILDREN';


  /**
   * Collapse or expand all parent nodes.
   */
  @Input('collapseAll')
  set collapseAll(value: boolean) {
    this._collapseAll = value;
    this._recursiveEdit(
      this.nodes, this.childrenAttr, this.collapseAttr, value);
  }

  /**
   * Select or deselect all nodes.
   */
  @Input('selectAll')
  set selectAll(value: boolean) {
    this._selectAll = value;
    this._recursiveEdit(this.nodes, this.childrenAttr, this.selectAttr, value);
    this._recursiveEdit(
      this.nodes, this.childrenAttr, this.inDeterminateAttr, false);
  }

  /**
   * When change a node model this event will be emit.
   */
  @Output() onChange = new EventEmitter<any>();

  /**
   * On click node.
   */
  @Output() onClick = new EventEmitter<any>();

  constructor() {
    this.date.setDate(this.date.getDate() - 1);
  }

  ngOnInit() {
    // Clone input data for protect.
    const cloned = this.data.map(x => Object.assign([], x));

    // If data is flat, prepare data with recursive function.
    this.nodes = this.prepareData ? this._getPreparedData(cloned) : this.data;
  }

  onModelChange(node) {
    if (node[this.childrenAttr].length) {
      this._recursiveEdit(
        [node], this.childrenAttr, this.selectAttr, node[this.selectAttr]);
    }
    this.onChange.emit(node);
  }

  click(node: any) {
    if (node[this.childrenAttr].length) {
      node[this.collapseAttr] = !node[this.collapseAttr]
    }
    this.onClick.emit(node);
  }

  change(value: any) {
    const parent = this.nodes.filter(
      (item) => { return item[this.idAttr] === value[this.parentAttr] })[0];
    if (parent) {
      let hasDifferent = false, duplicate = {},
        isIndeterminate = value[this.inDeterminateAttr] || false;

      parent[this.childrenAttr].forEach((item) => {
        duplicate[item[this.selectAttr]] =
          (duplicate[item[this.selectAttr]] || 0) + 1;
        if (item[this.inDeterminateAttr]) {
          isIndeterminate = true;
        }
      });
      if (Object.keys(duplicate).length === 1 && !isIndeterminate) {
        parent[this.inDeterminateAttr] = false;
        parent[this.selectAttr] = JSON.parse(Object.keys(duplicate)[0]);
        this.onChange.emit(parent);
      } else {
        parent[this.inDeterminateAttr] = true;
        this.onChange.emit(parent);
      }
    }
  }

  private _recursiveEdit(list, childrenAttr, attr, value) {
    if (Array.isArray(list)) {
      for (let i = 0, len = list.length; i < len; i++) {
        list[i][attr] = value;
        if (list[i][childrenAttr].length) {
          this._recursiveEdit(list[i][childrenAttr], childrenAttr, attr, value);
        }
      }
    }
  }

  dateChanged(value: boolean) {
    this.onChange.emit(true);
  }

  private _getPreparedData(list) {
    let tree = [], lookup = {};
    for (let i = 0, len = list.length; i < len; i++) {
      lookup[list[i][this.idAttr]] = list[i];
      list[i][this.childrenAttr] = [];
      list[i][this.collapseAttr] = true;
      list[i][this.selectAttr] = false;
      list[i][this.inDeterminateAttr] = false;
      list[i][this.startDate] = new Date();
      list[i][this.endDate] = new Date();
    }
    for (let i = 0, len = list.length; i < len; i++) {
      if (list[i][this.parentAttr]) {
        lookup[list[i][this.parentAttr]][this.childrenAttr].push(list[i]);
      } else {
        tree.push(list[i]);
      }
    }
    return tree;
  };
}

