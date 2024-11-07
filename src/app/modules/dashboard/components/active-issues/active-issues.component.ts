import { Component, Input, ViewEncapsulation } from '@angular/core';
import { StatusCounts } from '../../models';
import { DecimalPipe } from '@angular/common';

@Component({
    selector: 'app-active-issues',
    templateUrl: 'active-issues.component.html',
    styleUrls: ['active-issues.component.css'],
    standalone: true,
    imports: [DecimalPipe],
})
export class ActiveIssuesComponent {

    @Input() public statusCounts: StatusCounts | undefined;

    constructor() { }
}
