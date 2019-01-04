import { Injectable } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { Location } from '@angular/common';

@Injectable()
export class NavigationService {
    constructor(private router: Router, private location: Location) { }

    public navigate(commands: any[], extras?: NavigationExtras): Promise<boolean> {
        return this.router.navigate(commands, extras);
    }

    public back() {
        this.location.back();
    }
}
