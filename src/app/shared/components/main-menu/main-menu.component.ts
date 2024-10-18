import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-main-menu',
    templateUrl: 'main-menu.component.html',
    styles: [`
    .logo {
        width: 100px;
    }
    `],
    standalone: true,
    imports: [RouterLink]
})
export class MainMenuComponent { }
