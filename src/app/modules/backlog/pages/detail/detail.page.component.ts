import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Subscription, BehaviorSubject, Observable } from 'rxjs';

import { DetailScreenType } from 'src/app/shared/models/ui/types/detail-screens';
import { PtItem, PtTask, PtComment, PtUser } from 'src/app/core/models/domain';
import { BacklogService } from '../../services/backlog.service';
import { PtUserService, NavigationService } from 'src/app/core/services';
import { PtNewTask, PtTaskUpdate, PtNewComment } from 'src/app/shared/models/dto';
import { Store } from 'src/app/core/state/app-store';
import { PtItemChitchatComponent } from '../../components/detail/item-chitchat/pt-item-chitchat.component';
import { PtItemTasksComponent } from '../../components/detail/item-tasks/pt-item-tasks.component';
import { PtItemDetailsComponent } from '../../components/detail/item-details/pt-item-details.component';
import { DetailSectionSelectorComponent } from '../../components/detail/detail-section-selector/detail-section-selector.component';
import { NgIf, NgSwitch, NgSwitchCase, AsyncPipe } from '@angular/common';

@Component({
    selector: 'app-backlog-detail-page',
    templateUrl: 'detail.page.component.html',
    standalone: true,
    imports: [NgIf, DetailSectionSelectorComponent, NgSwitch, NgSwitchCase, PtItemDetailsComponent, PtItemTasksComponent, PtItemChitchatComponent, AsyncPipe]
})
export class DetailPageComponent implements OnInit, OnDestroy {

    private itemId = 0;
    private currentItemSub: Subscription | undefined;
    public selectedDetailsScreen: DetailScreenType = 'details';

    public item: PtItem | undefined;
    public tasks$: BehaviorSubject<PtTask[]> = new BehaviorSubject<PtTask[]>([]);
    public comments$: BehaviorSubject<PtComment[]> = new BehaviorSubject<PtComment[]>([]);
    public currentUser$: Observable<PtUser> = this.store.select<PtUser>('currentUser');

    constructor(
        private activatedRoute: ActivatedRoute,
        private backlogService: BacklogService,
        private ptUserService: PtUserService,
        private navigationService: NavigationService,
        private store: Store
    ) { }

    public ngOnInit() {
        this.itemId = parseInt(this.activatedRoute.snapshot.params['id'], undefined);

        this.currentItemSub = this.backlogService.getPtItem(this.itemId)
            .subscribe(item => {
                this.item = item;
                this.tasks$.next(item.tasks);
                this.comments$.next(item.comments);
            });

        const screen = this.activatedRoute.snapshot.params['screen'] as DetailScreenType;
        if (screen === 'details' || screen === 'tasks' || screen === 'chitchat') {
            this.selectedDetailsScreen = screen;
        } else {
            this.navigationService.navigate([`/detail/${this.itemId}/details`]);
        }
    }

    public onScreenSelected(screen: DetailScreenType) {
        this.selectedDetailsScreen = screen;
        this.navigationService.navigate([`/detail/${this.itemId}/${screen}`]);
    }

    public onUsersRequested(name: string) {
        this.ptUserService.fetchUsers(name);
    }

    public onAddNewTask(newTask: PtNewTask) {
        if (this.item) {
            this.backlogService.addNewPtTask(newTask, this.item).then(nextTask => {
                this.tasks$.next([nextTask].concat(this.tasks$.value));
            });
        }
    }

    public onUpdateTask(taskUpdate: PtTaskUpdate) {
        if (this.item) {
            if (taskUpdate.delete) {
                this.backlogService.deletePtTask(this.item, taskUpdate.task).then(ok => {
                    if (ok) {
                        const newTasks = this.tasks$.value.filter(task => {
                            if (task.id !== taskUpdate.task.id) {
                                return task;
                            }
                        });
                        this.tasks$.next(newTasks);
                    }
                });
            } else {
                this.backlogService.updatePtTask(this.item, taskUpdate.task, taskUpdate.toggle, taskUpdate.newTitle).then(updatedTask => {
                    const newTasks = this.tasks$.value.map(task => {
                        if (task.id === updatedTask.id) {
                            return updatedTask;
                        } else {
                            return task;
                        }
                    });
                    this.tasks$.next(newTasks);
                });
            }
        }
    }

    public onAddNewComment(newComment: PtNewComment) {
        if (this.item) {
            this.backlogService.addNewPtComment(newComment, this.item).then(nextComment => {
                this.comments$.next([nextComment].concat(this.comments$.value));
            });
        }
    }

    public onItemSaved(item: PtItem) {
        this.currentItemSub = this.backlogService.updatePtItem(item)
            .subscribe(updateItem => {
                this.item = updateItem;
            });
    }

    public ngOnDestroy(): void {
        if (this.currentItemSub) {
            this.currentItemSub.unsubscribe();
        }
    }
}
