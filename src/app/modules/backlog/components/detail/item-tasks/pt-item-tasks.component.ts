import { Component, Input, ChangeDetectionStrategy, Output, EventEmitter, OnInit } from '@angular/core';

import { PtItem, PtTask } from '../../../../../core/models/domain';
import { PtNewTask, PtTaskUpdate } from '../../../../../shared/models/dto';
import { EMPTY_STRING } from '../../../../../core/helpers/string-helpers';
import { BehaviorSubject } from 'rxjs';

@Component({
    selector: 'app-item-tasks',
    templateUrl: 'pt-item-tasks.component.html',
    styleUrls: ['pt-item-tasks.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PtItemTasksComponent {

    @Input() public tasks$: BehaviorSubject<PtTask[]> = new BehaviorSubject<PtTask[]>([]);

    @Output() addNewTask = new EventEmitter<PtNewTask>();
    @Output() updateTask = new EventEmitter<PtTaskUpdate>();

    public newTaskTitle = EMPTY_STRING;
    private lastUpdatedTitle = EMPTY_STRING;

    public onAddTapped(newTaskTextField: any) {
        const newTitle = this.newTaskTitle.trim();
        if (newTitle.length === 0) {
            return;
        }
        const newTask: PtNewTask = {
            title: newTitle,
            completed: false
        };
        this.addNewTask.emit(newTask);
        this.newTaskTitle = EMPTY_STRING;
    }

    public toggleTapped(task: PtTask) {
        const taskUpdate: PtTaskUpdate = {
            task: task,
            toggle: true
        };
        this.updateTask.emit(taskUpdate);
    }

    public taskTitleChange(task: PtTask, newTitle: string) {
        if (task.title === newTitle) {
            return;
        }
        this.lastUpdatedTitle = newTitle;
    }

    public taskBlurred(task: PtTask) {
        if (task.title === this.lastUpdatedTitle) {
            return;
        }
        const taskUpdate: PtTaskUpdate = {
            task: task,
            toggle: false,
            newTitle: this.lastUpdatedTitle
        };
        this.updateTask.emit(taskUpdate);
        this.lastUpdatedTitle = EMPTY_STRING;
    }

    public taskDelete(task: PtTask) {
        const taskUpdate: PtTaskUpdate = {
            task: task,
            toggle: false,
            delete: true
        };
        this.updateTask.emit(taskUpdate);
    }
}
