import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { PtItem } from 'src/app/core/models/domain';

@Component({
    selector: 'app-item-details',
    templateUrl: 'pt-item-details.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PtItemDetailsComponent implements OnInit {

    @Input() item?: PtItem;

    constructor() { }

    public ngOnInit() { }
}
