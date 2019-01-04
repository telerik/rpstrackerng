import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment as env } from '../../../../environments/environment';

import { PtTask, PtItem, PtComment } from '../../../core/models/domain';
import { PresetType } from 'src/app/core/models/domain/types';

@Injectable()
export class BacklogRepository {
    constructor(
        private http: HttpClient
    ) { }

    private getFilteredBacklogUrl(currentPreset: PresetType, currentUserId?: number) {
        switch (currentPreset) {
            case 'my':
                if (currentUserId) {
                    return `${env.apiEndpoint}/myItems?userId=${currentUserId}`;
                } else {
                    return `${env.apiEndpoint}/backlog`;
                }
            case 'open':
                return `${env.apiEndpoint}/openItems`;
            case 'closed':
                return `${env.apiEndpoint}/closedItems`;
            default:
                return `${env.apiEndpoint}/backlog`;
        }
    }

    private getPtItemUrl(itemId: number) {
        return `${env.apiEndpoint}/item/${itemId}`;
    }

    private postPtItemUrl() {
        return `${env.apiEndpoint}/item`;
    }

    private putPtItemUrl(itemId: number) {
        return `${env.apiEndpoint}/item/${itemId}`;
    }

    private deletePtItemUrl(itemId: number) {
        return `${env.apiEndpoint}/item/${itemId}`;
    }

    private postPtTaskUrl() {
        return `${env.apiEndpoint}/task`;
    }

    private putPtTaskUrl(taskId: number) {
        return `${env.apiEndpoint}/task/${taskId}`;
    }

    private postPtCommentUrl() {
        return `${env.apiEndpoint}/comment`;
    }

    private deletePtCommentUrl(commentId: number) {
        return `${env.apiEndpoint}/comment/${commentId}`;
    }

    public getPtItems(
        currentPreset: PresetType,
        currentUserId: number,
        successHandler: (data: PtItem[]) => void
    ) {
        this.http.get<PtItem[]>(this.getFilteredBacklogUrl(currentPreset, currentUserId))
            .subscribe(successHandler);
    }

    public getPtItem(
        ptItemId: number,
        successHandler: (ptItem: PtItem) => void
    ) {
        this.http.get<PtItem>(this.getPtItemUrl(ptItemId))
            .subscribe(successHandler);
    }

    public insertPtItem(
        item: PtItem,
        successHandler: (nextItem: PtItem) => void
    ) {
        this.http.post<PtItem>(
            this.postPtItemUrl(),
            { item: item }
        )
            .subscribe(successHandler);
    }

    public updatePtItem(
        item: PtItem,
        successHandler: (updatedItem: PtItem) => void
    ) {
        this.http.put<PtItem>(
            this.putPtItemUrl(item.id),
            { item: item }
        )
            .subscribe(successHandler);
    }

    public deletePtItem(
        itemId: number,
        successHandler: () => void
    ) {
        this.http.delete(
            this.deletePtItemUrl(itemId)
        )
            .subscribe(successHandler);
    }

    public insertPtTask(
        task: PtTask,
        ptItemId: number,
        successHandler: (nextTask: PtTask) => void
    ) {
        this.http.post<PtTask>(
            this.postPtTaskUrl(),
            { task: task, itemId: ptItemId }
        )
            .subscribe(successHandler);
    }

    public updatePtTask(
        task: PtTask,
        ptItemId: number,
        successHandler: (updatedTask: PtTask) => void
    ) {
        this.http.put<PtTask>(
            this.putPtTaskUrl(task.id),
            { task: task, itemId: ptItemId }
        )
            .subscribe(successHandler);
    }

    public insertPtComment(
        comment: PtComment,
        ptItemId: number,
        successHandler: (nextComment: PtComment) => void
    ) {
        this.http.post<PtComment>(
            this.postPtCommentUrl(),
            { comment: comment, itemId: ptItemId }
        )
            .subscribe(successHandler);
    }

    public deletePtComment(
        ptCommentId: number,
        successHandler: () => void
    ) {
        this.http.delete(this.deletePtCommentUrl(ptCommentId))
            .subscribe(successHandler);
    }
}
