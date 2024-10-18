import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-side-menu',
    templateUrl: 'side-menu.component.html',
    standalone: true,
    imports: [RouterLink]
})
export class SideMenuComponent { }
