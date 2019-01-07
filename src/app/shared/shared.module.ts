import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { PresetFilterComponent } from './components/preset-filter/preset-filter.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MainMenuComponent } from './components/main-menu/main-menu.component';
import { SideMenuComponent } from './components/side-menu/side-menu.component';

@NgModule({
    imports: [
        FormsModule,
        RouterModule,
        NgbModule
    ],
    exports: [
        FormsModule,
        MainMenuComponent,
        SideMenuComponent,
        PresetFilterComponent,
        NgbModule
    ],
    declarations: [
        MainMenuComponent,
        SideMenuComponent,
        PresetFilterComponent
    ],
    providers: [],
})
export class SharedModule { }
