import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatFormFieldModule, MatInputModule, MatOptionModule,
  MatSelectModule, MatButtonModule, MatCardModule, MatDividerModule,
  MatSnackBarModule, MatDatepickerModule,
  // MatToolbarModule, MatIconModule,
  // MatPaginatorModule, MatNativeDateModule , MatMenuModule,
  // MatGridListModule, MatTableModule, MatDialogModule
} from '@angular/material';

import { MatCheckboxModule } from '@angular/material/checkbox';
// import { MatButtonToggleModule} from '@angular/material/button-toggle';

import { RegisterUserComponent } from './register-user.component';

@NgModule({
  declarations: [RegisterUserComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    // HttpClientModule,
    // AppRoutingModule,

    // MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    // MatIconModule,
    MatButtonModule,
    MatCardModule,
    // MatTableModule,
    MatDividerModule,
    MatSnackBarModule,
    // MatPaginatorModule,
    MatDatepickerModule,
    // MatNativeDateModule,
    MatCheckboxModule,
    // MatDialogModule,
    // MatButtonToggleModule,
    // MatGridListModule,
    // MatMenuModule,
    RouterModule.forChild([
      { path: '', component: RegisterUserComponent },
      {
        path: ':id',
        component: RegisterUserComponent,
        // canActivate: [AuthGuardRoles],
        // data: {roles: ['Admin', 'Teacher', 'Parent']}
      },
    ]),
  ]
})
export class RegisterModule { }


