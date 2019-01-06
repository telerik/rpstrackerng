import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PresetFilterComponent } from './components/preset-filter/preset-filter.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    imports: [
        FormsModule,
        NgbModule
    ],
    exports: [
        FormsModule,
        PresetFilterComponent,
        NgbModule
    ],
    declarations: [
        PresetFilterComponent
    ],
    providers: [],
})
export class SharedModule { }
