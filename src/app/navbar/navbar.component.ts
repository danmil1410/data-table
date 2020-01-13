import { Component } from '@angular/core';
import * as config from '../../assets/config/config.json'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.sass']
})
export class NavbarComponent {
  public appName: string;
  public appVersion: string;

  constructor() {
    this.appName = config.appName;
    this.appVersion = config.appVersion;
  }

}
