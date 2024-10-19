import { Component, EventEmitter, Output, ChangeDetectionStrategy, Input } from '@angular/core';
import { DetailScreenType } from '../../../../../shared/models/ui/types/detail-screens';


@Component({
    selector: 'app-detail-section-selector',
    templateUrl: 'detail-section-selector.component.html',
    styleUrls: ['detail-section-selector.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true
})
export class DetailSectionSelectorComponent {

    @Input() selectedScreen: DetailScreenType = 'form';
    @Output() screenSelected = new EventEmitter<DetailScreenType>();

    public onFormTap() {
        this.screenSelected.emit('form');
    }
    public onTasksTap() {
        this.screenSelected.emit('tasks');
    }
    public onChitchatTap() {
        this.screenSelected.emit('chitchat');
    }
}
