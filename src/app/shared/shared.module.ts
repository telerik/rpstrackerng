import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PresetFilterComponent } from './components/preset-filter/preset-filter.component';



@NgModule({
    imports: [
        FormsModule
    ],
    exports: [
        FormsModule,
        PresetFilterComponent
    ],
    declarations: [
        PresetFilterComponent
    ],
    providers: [],
})
export class SharedModule { }
