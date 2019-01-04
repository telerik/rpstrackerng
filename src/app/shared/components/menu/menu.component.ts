import { Component } from '@angular/core';
import { NavigationService } from 'src/app/core/services';
import { PresetType } from 'src/app/core/models/domain/types';

@Component({
    selector: 'app-menu',
    templateUrl: 'menu.component.html'
})
export class MenuComponent {

    constructor(
        private navigationService: NavigationService
    ) { }

    public onSelectPresetTap(preset: PresetType) {
        this.navigationService.navigate(['backlog', preset]);
    }

    public onSettingsTap() {
        this.navigationService.navigate(['settings']);
    }
}
