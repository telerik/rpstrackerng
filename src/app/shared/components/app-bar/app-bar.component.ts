import { Component } from '@angular/core';
import { RpsLogoComponent } from '../rps-logo/rps-logo.component';

@Component({
  selector: 'app-bar',
  standalone: true,
  imports: [RpsLogoComponent],
  templateUrl: './app-bar.component.html',
  styleUrl: './app-bar.component.scss'
})
export class AppBarComponent {

}
