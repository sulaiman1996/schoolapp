import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatFormFieldModule, MatInputModule, MatOptionModule,
    MatIconModule, MatCardModule, MatDividerModule,
    MatSelectModule, MatButtonModule, MatTableModule, 
    // MatSnackBarModule, MatDatepickerModule,  MatDialogModule,
    // MatToolbarModule, 
    // MatPaginatorModule, MatNativeDateModule , MatMenuModule,
    // MatGridListModule 
  } from '@angular/material';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { SelectorComponent } from './selector.component';
// import { MatButtonToggleModule} from '@angular/material/button-toggle';

@NgModule({
  declarations: [SelectorComponent],
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
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    // MatTableModule,
    MatDividerModule,
    // MatSnackBarModule,
    // MatPaginatorModule,
    // MatDatepickerModule,
    // MatNativeDateModule,
    // MatCheckboxModule,
    // MatDialogModule,
    // MatButtonToggleModule,
    // MatGridListModule,
    // MatMenuModule,
    RouterModule,
    RouterModule.forChild([
      { path: '', component: SelectorComponent },
    ]),
  ],
  providers: [DatePipe],
})
export class SelectorModule { }
