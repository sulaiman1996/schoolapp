import { AuthService } from './auth/service/auth.service';
import { Component } from '@angular/core';
import {MatIconRegistry} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';
import { DeviceDetectorService } from 'ngx-device-detector';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'PMSAPTS VHSS';
  items = ['item1', 'item2'];
  admin = false;
  parent = false;
  teacher = false;
  public deviceInfo = null;
  public isMobilevar = false;
  public isTabletvar = false;
  public isDesktopvar = false;
  constructor(private _authService: AuthService, iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer, private deviceService: DeviceDetectorService){
    // this.detectDevice();\
    this.isMobile();
    console.log(this.isMobilevar);
    if (this.isMobilevar) {
      // this.title = '';
    }
    iconRegistry.addSvgIcon(
      'home',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/home.svg'));
  }
  public detectDevice() {
    this.deviceInfo = this.deviceService.getDeviceInfo();
  }
  public isMobile() {
    this.isMobilevar = this.deviceService.isMobile();
  }

}
