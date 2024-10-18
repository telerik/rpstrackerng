import { Component, Input } from '@angular/core';
import { StatusCounts } from '../../models';
import { NgIf, DecimalPipe } from '@angular/common';

@Component({
    selector: 'app-active-issues',
    templateUrl: 'active-issues.component.html',
    styleUrls: ['active-issues.component.css'],
    standalone: true,
    imports: [NgIf, DecimalPipe]
})
export class ActiveIssuesComponent {

    @Input() public statusCounts: StatusCounts | undefined;

    constructor() { }
}
