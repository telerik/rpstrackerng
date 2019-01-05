import { Injectable, NgZone, Inject } from '@angular/core';

import { environment as env } from '../../../../environments/environment';

import { Store } from '../../../core/state/app-store';
import { BacklogRepository } from '../repositories/backlog.repository';
import { ServerErrorHandlerService } from '../../../core/services';
import { PtItem, PtUser, PtTask, PtComment } from '../../../core/models/domain';
import { PtNewItem, PtNewTask, PtNewComment } from '../../../shared/models/dto';
import { PriorityEnum, StatusEnum } from '../../../core/models/domain/enums';
import { getUserAvatarUrl } from '../../../core/helpers/user-avatar-helper';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { PresetType } from 'src/app/core/models/domain/types';

@Injectable()
export class BacklogService {

    private get currentPreset() {
        return this.store.value.selectedPreset;
    }

    private get currentUserId() {
        if (this.store.value.currentUser) {
            return this.store.value.currentUser.id;
        } else {
            return undefined;
        }
    }

    constructor(
        private repo: BacklogRepository,
        private store: Store,
        private zone: NgZone
    ) { }

    public getItems(preset: PresetType): Observable<PtItem[]> {
        return this.repo.getPtItems(preset, this.currentUserId)
            .pipe(
                map((ptItems: PtItem[]) => {
                    ptItems.forEach(i => {
                        this.setUserAvatarUrl(i.assignee);
                        i.comments.forEach(c => this.setUserAvatarUrl(c.user));
                    });
                    return ptItems;
                })
            );
    }

    public getItemFromCacheOrServer(id: number) {
        // const selectedItem = _.find(this.store.value.backlogItems, i => i.id === id);
        const selectedItem = this.store.value.backlogItems.find(i => i.id === id);
        if (selectedItem) {
            this.zone.run(() => {
                this.store.set('currentSelectedItem', selectedItem);
            });
        } else {
            this.getPtItem(id);
        }
    }

    private setUserAvatarUrl(user: PtUser | undefined) {
        if (user) {
            user.avatar = `${env.apiEndpoint}/photo/${user.id}`;
        }
    }

    public getPtItem(id: number): Observable<PtItem> {
        return this.repo.getPtItem(id)
            .pipe(
                tap((ptItem: PtItem) => {
                    this.setUserAvatarUrl(ptItem.assignee);
                    ptItem.comments.forEach(c => this.setUserAvatarUrl(c.user));
                })
            );
    }

    public addNewPtItem(newItem: PtNewItem, assignee: PtUser) {
        const item: PtItem = {
            id: 0,
            title: newItem.title,
            description: newItem.description,
            type: newItem.type,
            estimate: 0,
            priority: PriorityEnum.Medium,
            status: StatusEnum.Open,
            assignee: assignee,
            tasks: [],
            comments: [],
            dateCreated: new Date(),
            dateModified: new Date()
        };
        this.repo.insertPtItem(
            item,
            (nextItem: PtItem) => {
                this.setUserAvatar(nextItem.assignee);
                this.zone.run(() => {
                    this.store.set('backlogItems', [nextItem, ...this.store.value.backlogItems]);
                });
            }
        );
    }

    public updatePtItem(item: PtItem): Observable<PtItem> {
        return this.repo.updatePtItem(item);
    }

    public deletePtItem(item: PtItem) {
        this.repo.deletePtItem(item.id,
            () => {
                this.zone.run(() => {
                    const updatedItems = this.store.value.backlogItems.filter((i) => {
                        return i.id !== item.id;
                    });
                    this.store.set('backlogItems', updatedItems);
                });
            }
        );
    }

    public addNewPtTask(newTask: PtNewTask, currentItem: PtItem) {
        const task: PtTask = {
            id: 0,
            title: newTask.title,
            completed: false,
            dateCreated: new Date(),
            dateModified: new Date()
        };
        this.repo.insertPtTask(
            task,
            currentItem.id,
            (_nextTask: PtTask) => {
                this.getPtItem(currentItem.id);
            }
        );
    }

    public updatePtTask(currentItem: PtItem, task: PtTask, toggle: boolean, newTitle?: string) {
        const taskToUpdate: PtTask = {
            id: task.id,
            title: newTitle ? newTitle : task.title,
            completed: toggle ? !task.completed : task.completed,
            dateCreated: task.dateCreated,
            dateModified: new Date()
        };

        const updatedTasks = currentItem.tasks.map(t => {
            if (t.id === task.id) { return taskToUpdate; } else { return t; }
        });

        const updatedItem = Object.assign({}, currentItem, { tasks: updatedTasks });

        // Optimistically update local item
        this.zone.run(() => {
            this.store.set('currentSelectedItem', updatedItem);
        });

        this.repo.updatePtTask(taskToUpdate, currentItem.id,
            (_updatedTask: PtTask) => {
                this.getPtItem(currentItem.id);
            }
        );
    }

    public addNewPtComment(newComment: PtNewComment, currentItem: PtItem) {
        const comment: PtComment = {
            id: 0,
            title: newComment.title,
            user: this.store.value.currentUser,
            dateCreated: new Date(),
            dateModified: new Date()
        };
        this.repo.insertPtComment(
            comment,
            currentItem.id,
            (_nextComment: PtComment) => {
                this.getPtItem(currentItem.id);
            }
        );
    }

    private setUserAvatar(user: PtUser) {
        user.avatar = getUserAvatarUrl(env.apiEndpoint, user.id);
    }
}
