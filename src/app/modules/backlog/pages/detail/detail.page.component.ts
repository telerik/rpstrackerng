import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Subscription, BehaviorSubject } from 'rxjs';

import { DetailScreenType } from 'src/app/shared/models/ui/types/detail-screens';
import { PtItem, PtTask } from 'src/app/core/models/domain';
import { BacklogService } from '../../services/backlog.service';
import { PtUserService, NavigationService } from 'src/app/core/services';
import { PtNewTask, PtTaskUpdate } from 'src/app/shared/models/dto';

@Component({
    selector: 'app-backlog-detail-page',
    templateUrl: 'detail.page.component.html'
})
export class DetailPageComponent implements OnInit, OnDestroy {

    private itemId = 0;
    private currentItemSub: Subscription | undefined;
    public selectedDetailsScreen: DetailScreenType = 'details';

    public item: PtItem | undefined;
    public tasks$: BehaviorSubject<PtTask[]> = new BehaviorSubject<PtTask[]>([]);

    constructor(
        private activatedRoute: ActivatedRoute,
        private backlogService: BacklogService,
        private ptUserService: PtUserService,
        private navigationService: NavigationService
    ) { }

    public ngOnInit() {

        this.itemId = parseInt(this.activatedRoute.snapshot.params['id'], undefined);

        this.currentItemSub = this.backlogService.getPtItem(this.itemId)
            .subscribe(item => {
                this.item = item;
                this.tasks$.next(item.tasks);
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
