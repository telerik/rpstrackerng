import { Component, Input, ChangeDetectionStrategy, Output, EventEmitter, ViewContainerRef } from '@angular/core';

import { PtItem, PtComment, PtUser, PtTask } from '../../../../../core/models/domain';
import { PtNewComment } from '../../../../../shared/models/dto';
import { EMPTY_STRING } from '../../../../../core/helpers/string-helpers';
import { BehaviorSubject } from 'rxjs';
import { NgFor, AsyncPipe, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-item-chitchat',
    templateUrl: 'pt-item-chitchat.component.html',
    styleUrls: ['pt-item-chitchat.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [FormsModule, NgFor, AsyncPipe, DatePipe]
})
export class PtItemChitchatComponent {

    @Input() public comments$: BehaviorSubject<PtComment[]> = new BehaviorSubject<PtComment[]>([]);
    @Input() public currentUser: PtUser | undefined;
    @Output() addNewComment = new EventEmitter<PtNewComment>();

    public newCommentText = EMPTY_STRING;

    public get currentUserAvatar() {
        if (this.currentUser) {
            return this.currentUser.avatar;
        }
        return EMPTY_STRING;;
    }

    public onAddTapped() {
        const newTitle = this.newCommentText.trim();
        if (newTitle.length === 0) {
            return;
        }
        const newComment: PtNewComment = {
            title: newTitle
        };
        this.addNewComment.emit(newComment);
        this.newCommentText = EMPTY_STRING;
    }
}
