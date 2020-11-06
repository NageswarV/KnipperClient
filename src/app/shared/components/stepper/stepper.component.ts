import { Component, OnInit, OnChanges, Input, SimpleChanges} from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ClassificationService } from '../../../core/classification.service';

@Component({
  selector: 'samplicity-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss']
})
export class StepperComponent implements OnInit, OnChanges {

  @Input() stepHeaders: any;
  dialogRef: MatDialogRef<any>;
  steps: {
    id: string,
    status: number,
    name: string
  }[]= [];
  currentStatus: number;

  constructor(
    private classificationService: ClassificationService
  ) { }

  ngOnInit() {
    this.setSteps();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.setSteps();
  }

  setCurrent(): void {
    this.steps.forEach((step, index) => {
      if (index === 0 && this.steps[this.steps.length - 1].status === 3 && this.steps[index + 1].status === 3) {
        this.currentStatus = index;
      } else if (step.status !== 3 && index === this.steps.length - 1){
        this.currentStatus = index;
      // tslint:disable-next-line:max-line-length
      } else if (index > 0 && index < this.steps.length && this.steps[index - 1].status !== 3 && step.status !== 3 && this.steps[index + 1].status === 3) {
        this.currentStatus = index;
      }
    });
  }

  private setSteps() {
    this.steps = this.stepHeaders.map(function(step) {
      return {
        name: step.classificationValueName,
        status: step.status
      };
    });
    this.setCurrent();
  }
}
