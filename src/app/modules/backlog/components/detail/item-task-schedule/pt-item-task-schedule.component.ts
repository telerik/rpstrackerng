import { Component, Input, ChangeDetectionStrategy, Output, EventEmitter, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { PtTask } from '../../../../../core/models/domain';
import { PtNewTask, PtTaskUpdate } from '../../../../../shared/models/dto';
import { EMPTY_STRING } from '../../../../../core/helpers/string-helpers';
import { BehaviorSubject } from 'rxjs';
import { SchedulerEvent, SaveEvent, RemoveEvent } from '@progress/kendo-angular-scheduler';


@Component({
    selector: 'app-item-task-schedule',
    templateUrl: 'pt-item-task-schedule.component.html',
    styleUrls: ['pt-item-task-schedule.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PtItemTaskScheduleComponent implements OnInit {

    @Input() public tasks$: BehaviorSubject<PtTask[]> = new BehaviorSubject<PtTask[]>([]);

    @Output() addNewTask = new EventEmitter<PtNewTask>();
    @Output() updateTask = new EventEmitter<PtTaskUpdate>();

    public newTaskTitle = EMPTY_STRING;
    private lastUpdatedTitle = EMPTY_STRING;

    public displayDate = new Date();
    public startTime = '07:00';
    public events: SchedulerEvent[] = [];
    public formGroup: FormGroup | undefined;

    constructor(private formBuilder: FormBuilder) {
        this.createFormGroup = this.createFormGroup.bind(this);
    }

    public ngOnInit() {
        this.tasks$.subscribe(tasks => {
            const sevents = tasks.filter(t => t.dateStart && t.dateEnd).map(t => {
                const evt: SchedulerEvent = {
                    id: t.id,
                    title: t.title ? t.title : '',
                    start: t.dateStart ? t.dateStart : new Date(),
                    end: t.dateEnd ? t.dateEnd : new Date(),
                    isAllDay: false
                };
                return evt;
            });

            if (sevents.length > 0) {
                this.events = sevents;
                const minDate = new Date(Math.min.apply(null, sevents.map((e) => new Date(e.start).valueOf())));
                this.displayDate = minDate;
            }
        });
    }

    public createFormGroup(args: any): FormGroup {
        const ev = args.event;

        this.formGroup = this.formBuilder.group({
            'id': args.isNew ? this.getNextId() : ev.id,
            'start': [ev.start, Validators.required],
            'end': [ev.end, Validators.required],
            'startTimezone': [ev.startTimezone],
            'endTimezone': [ev.endTimezone],
            'isAllDay': ev.isAllDay,
            'title': ev.title,
            'description': ev.description,
            'recurrenceRule': ev.recurrenceRule
        });

        return this.formGroup;
    }

    public getNextId(): number {
        const len = this.events.length;
        return (len === 0) ? 1 : this.events[this.events.length - 1].id + 1;
    }

    public onSave(args: SaveEvent) {
        if (args.isNew) {
            const newTask: PtNewTask = {
                // TODO: Change this to appropriate collection when implemented in scheduler
                title: args.formGroup.controls['title'].value,
                completed: false,
                dateStart: args.formGroup.controls['start'].value,
                dateEnd: args.formGroup.controls['end'].value
            };
            this.addNewTask.emit(newTask);
        } else {
            const taskToUpdate = this.tasks$.value.find(t => t.id === args.dataItem.id);
            if (taskToUpdate) {
                // TODO: Change this to appropriate collection when implemented in scheduler
                taskToUpdate.title = args.formGroup.controls['title'].value;
                taskToUpdate.dateStart = args.dataItem.start;
                taskToUpdate.dateEnd = args.dataItem.end;
                const taskUpdate: PtTaskUpdate = {
                    task: taskToUpdate,
                    toggle: false
                };
                this.updateTask.emit(taskUpdate);
            }
        }
    }

    public onRemove(args: RemoveEvent) {
        // TODO: This is not implemented at the correct momemt - right now this event is
        // triggered when the 'x' on the event is hit, but there is no other event for removal.
        const taskToDelete = this.tasks$.value.find(t => t.id === args.event.id);
        if (taskToDelete) {
            const taskUpdate: PtTaskUpdate = {
                task: taskToDelete,
                toggle: false,
                delete: true
            };

            // this.updateTask.emit(taskUpdate);
        }
    }

}
