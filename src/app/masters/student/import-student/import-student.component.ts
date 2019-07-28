
import { Component, OnInit } from '@angular/core';
import { MasterService } from './../../../masterservices/master.service';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource, MatSnackBar, MatMenuModule, MatFormFieldModule } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { flatMap } from 'rxjs/operators';
import * as myGlobals from '../../../global';
@Component({
  selector: 'app-import-student',
  templateUrl: './import-student.component.html',
  styleUrls: ['./import-student.component.css']
})
export class ImportStudentComponent implements OnInit {
  displayedColumns: string[] = [ 'admNo', 'classNo', 'name',
          'myClass', 'myGender', 'myRelegion', 'myCaste',
          'dob', 'dateOfJoin', 'parentName', 'mobileNo', 'address'];
  displayedColumnsError: string[] = [ 'AdmNo', 'ClassNo', 'Name', 'Error'];
  form: FormGroup;
  dataSource: any;
  dataSourceError: any;
  tableData = [];

  studentImport = [];
  userImport = [];
  userid: string;
  classes = [];
  subjects = [];
  students = [];
  importErrors = [];
  enabled = false;
  emptyRowCount = 0;
  writeConcernErrors = [];
  writeErrors = [];
  resultOkMessage = '';
  constructor(private masterService: MasterService,
    private fb: FormBuilder,
    private location: Location, private router: Router) {
      this.createForm();
    }
  createForm() {
    this.form = this.fb.group({
      myClass: [''],
    });
  }
  ngOnInit() {
    this.userid = localStorage.getItem('userid');
    // localStorage.setItem('username', res.user['email']);
    this.masterService.getClasses()
    .subscribe(
      res => {
        this.classes = res;
        // console.log(this.classes);
        this.classes.push({_id: '--', name: 'NA', divisions: '--', __v: 0});
      }
    );
  }
  correctData(){

  }
  isEmptyRow(row){
    if (row.length > 2) {
        return row[0] === '' || row[1] === '' || row[2] === '';
    }
    return true;
  }
  onFileSelect(input: HTMLInputElement) {
    console.log('Start', input.files);
    if (input.files.length === 0) {
      return ;
    }
    const fileReaded = input.files;
    const reader: FileReader = new FileReader();
    reader.readAsText(fileReaded[0]);
    this.studentImport.length = 0;
    this.userImport.length = 0;
    this.tableData.length = 0;
    this.importErrors.length = 0;
    this.writeConcernErrors.length = 0;
    this.writeErrors.length = 0;
    this.emptyRowCount = 0;
    this.resultOkMessage = '';
    reader.onload = (e) => {
      const csv: string = reader.result  as string;
      const allTextLines = csv.split(/\r|\n|\r/);
      const headers = allTextLines[0].split(',');
      console.log(headers);
      for (let i = 1; i < allTextLines.length; i++) {
        // split content based on comma
        const data = allTextLines[i].split(',');
        if (data.length === headers.length) {
          if (this.isEmptyRow(data) === false) {
            const tarr = [];
            const dataJson = {};
            const dataDisplay = {};
            for (let j = 0; j < headers.length; j++) {
                switch (headers[j].toLowerCase().trim()) {
                  case '_id':
                  case 'myuser':
                        break;
                  case 'school' :
                  case 'School ID' :
                  case 'SchoolID' :
                  case 'SchoolId' :
                  case 'schoolid' :
                        break;
                  case 'TCIssued' : dataJson[headers[j]] = data[j] === 'true';
                        break;
                  case 'class no':
                  case 'classno':
                  case 'rollno':
                  case 'roll':
                  case 'no':
                  case 'class no.':
                  case 'classno' : dataJson['classNo'] = +data[j];dataDisplay['classNo'] = +data[j];
                        break;
                  case 'dateofjoin':
                  case 'joindate':
                  case 'dateOfJoin':
                  case 'join date':
                        dataJson['dateOfJoin'] = this.getDateInFormat(data[j],dataJson);
                        dataDisplay['dateOfJoin'] = data[j];
                        break;
                  case 'dateofbirth':
                  case 'date of birth':
                  case 'birth date' :
                  case 'birthdate' :
                  case 'birth' :
                  case 'dob' :
                        dataJson['dob'] = this.getDateInFormat(data[j], dataJson);
                        dataDisplay['dob'] = data[j];
                        break;
                  case 'class':
                  case 'myClass':
                  case 'myclass':
                        dataDisplay['myClass'] = data[j];
                        const cl = this.form.get('myClass').value;
                        if (cl && cl._id !== '--') {
                          dataJson['myClass'] = cl._id;
                          dataDisplay['myClass'] = cl.name;
                        } else {
                          const clss = this.classes.find(x => x.name === data[j] && x.schoolid === localStorage.getItem('schoolid'));
                          if (clss) {
                            dataJson['myClass'] = clss._id;
                          } else {
                            dataJson['myClass'] = data[j];
                            this.importErrors.push(this.getErrorObject(data[j], dataJson, 'Class is not valid entry'));
                          }
                        }
                        break;
                  case 'name':
                  case 'Name':
                  case 'name of student':
                  case 'nameofstudent':
                        dataDisplay['name'] = data[j];
                        dataJson['name'] = data[j]; break;
                  case 'admission no':
                  case 'admision no':
                  case 'admno':
                  case 'adm':
                  case 'adm no':
                  case 'adm.no':
                  case 'adm. no':
                  case 'admission':
                  case 'admision':
                  case 'admissionno':
                        dataDisplay['admNo'] = data[j];
                        dataJson['admNo'] = data[j]; break;
                  case 'mygender':
                  case 'gender':
                  case 'sex':
                  case 'm/f':
                  case 'gen':
                        dataDisplay['myGender'] = data[j];
                        dataJson['myGender'] = data[j]; break;
                  case 'myRelegion':
                  case 'myrelegion':
                  case 'religion':
                  case 'relegion':
                  case 'myreligion':
                  case 'rel':
                        dataDisplay['myRelegion'] = data[j];
                        const reli = myGlobals.Utils.getValidReligion(data[j]);
                        if (reli === 'invalid') {
                          dataJson['myRelegion'] = data[j];
                          this.importErrors.push(this.getErrorObject( data[j], dataJson, 'Religion is not valid entry'));
                        } else {
                          dataJson['myRelegion'] = reli;
                        }
                        break;
                  case 'mycaste':
                  case 'caste':
                        dataDisplay['myCaste'] = data[j];
                        const caste = myGlobals.Utils.getValidCast(data[j]);
                        if (caste === 'invalid') {
                          dataJson['myCaste'] = data[j];
                          this.importErrors.push(this.getErrorObject( data[j], dataJson, 'Caste is not valid entry'));
                        } else {
                          dataJson['myCaste'] = caste;
                        }
                        break;
                  case 'mobileno':
                  case 'mobile no':
                  case 'mobile':
                  case 'mob':
                  case 'phone':
                  case 'phoneno':
                  case 'phone no':
                        dataDisplay['mobileNo'] = data[j];
                        dataJson['mobileNo'] = data[j]; break;
                  case 'par name':
                  case 'parent':
                  case 'parentname':
                  case 'parent name':
                        dataDisplay['parentName'] = data[j];
                        dataJson['parentName'] = data[j]; break;
                  case 'address':
                  case 'addres':
                  case 'adress':
                  case 'addr':
                  case 'add':
                        dataDisplay['address'] = data[j];
                        dataJson['address'] = data[j]; break;
                  case 'dialcode':
                  case 'code':
                  case 'dial':
                  case 'dial code':
                  case 'country code':
                        if (!data[j]) {
                          if (data[j].toString().trim() === ''){
                            data[j] = undefined;
                          }
                        }
                        dataDisplay['dialCode'] = data[j];
                        dataJson['dialCode'] = data[j];
                        break;
                  default: dataJson[headers[j]] = data[j];
                }
            }
            dataJson['TCIssued'] = false;
            dataJson['schoolid'] = localStorage.getItem('schoolid');
            console.log('class : ' + dataJson['myClass']);
            if(dataJson['myClass'] === undefined){
                const cl = this.form.get('myClass').value;
                if (cl && cl._id !== '--') {
                  dataJson['myClass'] = cl._id;
                  dataDisplay['myClass'] = cl.name;
                }
            }
            this.checkEmptyProperty(dataJson, 'admNo', 'AdmNo');
            this.checkEmptyProperty(dataJson, 'name', 'Name');
            this.checkEmptyProperty(dataJson, 'myClass', 'Class');
            this.checkEmptyProperty(dataJson, 'myGender', 'Gender');
            this.checkEmptyProperty(dataJson, 'classNo', 'ClassNo');
            this.checkEmptyProperty(dataJson, 'myRelegion', 'Relegion');
            this.checkEmptyProperty(dataJson, 'myCaste', 'Caste');
            this.checkEmptyProperty(dataJson, 'dob', 'Date of Birth');
            this.checkEmptyProperty(dataJson, 'dateOfJoin', 'Date of Join');
            this.checkEmptyProperty(dataJson, 'mobileNo', 'Mobile No');
            this.checkEmptyProperty(dataJson, 'parentName', 'Parent Name');
            this.checkEmptyProperty(dataJson, 'address', 'Address');
            const user = {
                  'name': dataJson['parentName'],
                  'userType': 'Parent',
                  'isApproved': true,
                  'email': dataJson['mobileNo'],
                  'parent': 'Father',
                  'password': dataJson['mobileNo'],
                  'schoolid': dataJson['schoolid']
            };
            this.userImport.push(user);
            this.studentImport.push(dataJson);
            this.tableData.push(dataDisplay);
          } else {
            this.emptyRowCount++;
          }
        }
      }
      this.dataSource = new MatTableDataSource(this.tableData);
      this.dataSourceError = new MatTableDataSource(this.importErrors);
      this.userImport.sort((a, b) => a.email < b.email ? -1 : a.email > b.email ? 1 : 0);
      this.studentImport.sort((a, b) => a.mobileNo < b.mobileNo ? -1 : a.mobileNo > b.mobileNo ? 1 : 0);
      // all rows in the csv file
      console.log(this.studentImport);
      console.log(this.userImport);
      console.log(this.importErrors);
    };
  }
  checkEmptyProperty(obj, pName, pDesc){
    if (obj[pName] === undefined ) {
      this.importErrors.push(this.getErrorObject(pDesc, obj, 'cann\'t be empty'));
      return;
    }
    if (obj[pName].toString().trim() === '' ) {
      this.importErrors.push(this.getErrorObject(pDesc, obj, 'cann\'t be empty'));
      return;
    }
  }
  getDateInFormat(dt, row){
    const dtsplit = dt.split(/[-,/,.]+/);
    if (dtsplit.length > 2) {
      // tslint:disable-next-line:max-line-length
      const dateInformat = `${(dtsplit[2].length > 2 ? '' : (dtsplit[2] > '50' ? '19' : '20')) }${dtsplit[2]}-${dtsplit[1]}-${dtsplit[0]}T00:00:00.000Z`;
      // console.log(dateInformat);
      if (myGlobals.Utils.IsDate(dt) === true) {
          return dateInformat;
      } else {
        this.importErrors.push(this.getErrorObject(dt, row, 'is not valid date format dd/mm/yyyy'));
        return '2000-01-01T00:00:00.000Z';
      }
    } else {
      this.importErrors.push(this.getErrorObject(dt, row, 'is not valid date format dd/mm/yyyy'));
      return '2000-01-01T00:00:00.000Z';
    }
  }
  getErrorObject(dt, row, errText){
    const err = {};
    if (row['name']) {
        err['Name'] = row['name'];
    }
    if (row['admNo']) {
      err['AdmNo'] = row['admNo'];
    }
    if (row['classNo']) {
      err['ClassNo'] = row['classNo'];
    }
    err['Error'] = dt + ' ' + errText;
    return err;
  }
  upload() {
    if (this.studentImport.length > 0){
      const dataImport = {
        students: this.studentImport,
        users: this.userImport
      };
      this.masterService.importStudent(dataImport).subscribe((res) => {
        // this.snackBar.open(`Student ${res['message']}`, 'OK', {
        //   duration: 3000
        // });
        // if (this.id === '__new' && res['status'] === 'S' ) {
        // // this.router.navigate([`/example`]);
        //   this.disableSave = true;
        //   this.router.navigate([`/studentdetail/${res['id']}`]);
        // }
        console.log(res);
        this.resultOkMessage = `Inserted ${res['students']['nInserted']} students`;
        console.log(this.resultOkMessage);

        this.writeConcernErrors = res['students']['writeConcernErrors'];
        this.writeErrors = res['students']['writeErrors'];
      }, (err) => {
          console.log(err.error);
          this.writeErrors.push(err.error['message']);
          this.writeErrors.push(err.error['error']);
      });
    }
  }
  navigateBack() {
      this.location.back();
  }

}
