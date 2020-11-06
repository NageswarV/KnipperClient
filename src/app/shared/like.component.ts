import { Component, OnInit, OnChanges, Input, EventEmitter, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as cls from '../../generated/classification-values';

@Component({
  selector: 'sg-like',
  templateUrl: './like.component.html',
  styleUrls: ['./like.component.scss'],
})

export class LikeComponent implements OnInit {

  constructor() { }
  @Input() disLikeFlag: boolean = false;
  @Input() likeFlag: boolean = false;

  @Output() onLikeDisLikeFlagChanged: EventEmitter<number> = new EventEmitter<number>();
  
  ngOnInit() {
   
  }

  onToggleLike(): void {
    this.likeFlag = !this.likeFlag;
    this.disLikeFlag = false;
    this.onLikeDisLikeFlagChanged.next(this.likeFlag ? 5 : 0);    
  }

  onToggleDisLike(): void {
    this.disLikeFlag = !this.disLikeFlag;
    this.likeFlag = false;        
    this.onLikeDisLikeFlagChanged.emit(this.disLikeFlag ? 1 : 0);
  }

}



