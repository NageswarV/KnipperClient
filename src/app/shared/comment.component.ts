import { Component, OnInit, OnChanges, Input, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

//zrimport { Comment } from '../../generated/service-client';

@Component({
    selector: 'sg-comment',
    templateUrl: './comment.component.html',
    styleUrls: ['./comment.component.scss'],
})
export class CommentComponent implements OnInit, OnChanges {
    @Input() commentList: Comment[];
    contentFlag = false;

    constructor() {}

    ngOnInit() {
    }

    ngOnChanges() {
        if (this.commentList) {
            this.sortComment();
        }
    }

    showContent(flag: boolean) {
        this.contentFlag = flag;
    }

    sortComment() {
        // this.commentList.sort((a, b) => {
        //     if (a.commentDate < b.commentDate) {
        //         return 1;
        //     } else if (a.commentDate > b.commentDate) {
        //         return -1;
        //     } else {
        //         return 0;
        //     }
        // });
    }
}
