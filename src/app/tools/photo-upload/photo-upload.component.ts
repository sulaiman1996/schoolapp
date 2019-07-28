import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, Validators, FormBuilder, AbstractControl,
} from '@angular/forms';
@Component({
  selector: 'app-photo-upload',
  templateUrl: './photo-upload.component.html',
  styleUrls: ['./photo-upload.component.css']
})
export class PhotoUploadComponent implements OnInit {
  dialogData = {};
  url: any = null;
  selectedFile: File = null;
  constructor(public dialogRef: MatDialogRef<PhotoUploadComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder) {
      this.url = data;
      // console.log(this.url);
    }

  ngOnInit() {
  }
  onNoClick(): void {
    // this.dialogData['status'] = false;
    // this.dialogData['file'] = null;
    this.dialogRef.close();
  }
  upload(){
    this.dialogData['status'] = true;
    this.dialogData['file'] = this.selectedFile;
  }
  onFileSelect(event) {
    if (event.target.files && event.target.files[0]) {
      this.selectedFile = <File>event.target.files[0];
      // console.log(this.selectedFile);
      const reader = new FileReader();
      // const reader: FileReader = new FileReader();
      reader.readAsDataURL(this.selectedFile); // read file as data url
      // tslint:disable-next-line:no-shadowed-variable
      reader.onload = (e: any) => { // called once readAsDataURL is completed
        this.url = e.target.result;
      };
    }
  }
}
