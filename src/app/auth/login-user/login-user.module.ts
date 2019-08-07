import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatFormFieldModule, MatInputModule, MatOptionModule,
   MatButtonModule, MatCardModule, MatDividerModule,
  MatSnackBarModule,
  // MatDatepickerModule,MatSelectModule,
  // MatToolbarModule, MatIconModule,
  // MatPaginatorModule, MatNativeDateModule , MatMenuModule,
  // MatGridListModule, MatTableModule, MatDialogModule
} from '@angular/material';

import { MatCheckboxModule } from '@angular/material/checkbox';
// import { MatButtonToggleModule} from '@angular/material/button-toggle';

import { LoginUserComponent } from './login-user.component';

@NgModule({
  declarations: [LoginUserComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    // HttpClientModule,
    // AppRoutingModule,

    // MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    // MatOptionModule,
    // MatSelectModule,
    // MatIconModule,
    MatButtonModule,
    MatCardModule,
    // MatTableModule,
    MatDividerModule,
    MatSnackBarModule,
    // MatPaginatorModule,
    // MatDatepickerModule,
    // MatNativeDateModule,
    MatCheckboxModule,
    // MatDialogModule,
    // MatButtonToggleModule,
    // MatGridListModule,
    // MatMenuModule,
    RouterModule.forChild([
      { path: '', component: LoginUserComponent }
    ]),
  ]
})
export class LoginUserModule { }
