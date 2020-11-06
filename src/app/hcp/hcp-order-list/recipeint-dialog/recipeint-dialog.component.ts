import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Communication } from '../../../../generated/service-client';

@Component({
  selector: 'app-recipeint-dialog',
  templateUrl: './recipeint-dialog.component.html',
  styleUrls: ['./recipeint-dialog.component.scss']
})
export class RecipeintDialogComponent implements OnInit {
  checked=true;
  constructor(public dialogRef: MatDialogRef<RecipeintDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data:Communication[]) { }

  ngOnInit() {

  }
  
  close(){
    this.dialogRef.close();
  }
 

}
