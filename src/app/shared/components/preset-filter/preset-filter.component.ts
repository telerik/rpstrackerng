import { Component } from '@angular/core';
import { NavigationService } from 'src/app/core/services';
import { PresetType } from 'src/app/core/models/domain/types';

@Component({
    selector: 'app-preset-filter',
    templateUrl: 'preset-filter.component.html'
})
export class PresetFilterComponent {

    constructor(
        private navigationService: NavigationService
    ) { }

    public onSelectPresetTap(preset: PresetType) {
        this.navigationService.navigate(['backlog', preset]);
    }
}
