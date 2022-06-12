import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { PresetFilterComponent } from './components/preset-filter/preset-filter.component';

import { MainMenuComponent } from './components/main-menu/main-menu.component';
import { SideMenuComponent } from './components/side-menu/side-menu.component';
import { ModalComponent } from './components/modal-dialog/modal-dialog.component';

@NgModule({
    imports: [
        FormsModule,
        RouterModule,
    ],
    exports: [
        FormsModule,
        MainMenuComponent,
        SideMenuComponent,
        PresetFilterComponent,
        ModalComponent,
    ],
    declarations: [
        MainMenuComponent,
        SideMenuComponent,
        PresetFilterComponent,
        ModalComponent,
    ],
    providers: [],
})
export class SharedModule { }
