
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { AuthService } from './auth/service/auth.service';
// import { FormsModule } from '@angular/forms';

import { AuthGuard } from './auth/service/auth.guard';
import { AuthGuardRoles } from './auth/service/auth.guard.roles';
import { TokenInterceptorService } from './auth/service/token-interceptor.service';
import { DeviceDetectorModule } from 'ngx-device-detector';

// import { LoginUserComponent } from './auth/login-user/login-user.component';
// import { SelectorComponent } from './tools/selector/selector.component';
// import { DashboardComponent } from './common/dashboard/dashboard.component';
// import { DatePipe } from '@angular/common';

// import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatIconModule,
  // MatFormFieldModule, MatInputModule, MatOptionModule,
  // MatSelectModule,  MatCardModule, MatDividerModule,
  // MatSnackBarModule, MatMenuModule,
  // MatGridListModule,
  // MatDialogModule,MatToolbarModule, MatButtonModule, MatTableModule,
  // MatPaginatorModule, MatDatepickerModule, MatNativeDateModule
  } from '@angular/material';

// import {CdkDragDrop, moveItemInArray, transferArrayItem, CdkDragHandle} from '@angular/cdk/drag-drop';
// import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
@NgModule({
  declarations: [
    AppComponent,
    // LoginUserComponent,
    // SelectorComponent,
    // DashboardComponent,
  ],
  imports: [
    BrowserModule,
    // FormsModule,
    // ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,

    // MatFormFieldModule,
    // MatInputModule,
    // MatOptionModule,
    // MatSelectModule,
    MatIconModule,
    // MatCardModule,
    // MatDividerModule,
    // MatSnackBarModule,
    // MatMenuModule,

    // MatToolbarModule,
    // MatButtonModule,
    // MatPaginatorModule,
    // MatDatepickerModule,
    // MatNativeDateModule,
    // MatDialogModule,
    // MatGridListModule,
    // ReactiveFormsModule,
    BrowserAnimationsModule,
    DeviceDetectorModule.forRoot()
  ],
  providers: [AuthService, AuthGuard, AuthGuardRoles,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }],
  entryComponents: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
