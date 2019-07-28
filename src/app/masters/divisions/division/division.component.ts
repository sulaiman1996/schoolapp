import { EventService } from './../../../event.service';
import { MasterService } from './../../../masterservices/master.service';
import { Component, OnInit } from '@angular/core';
import { defineDirective } from '@angular/core/src/render3';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-division',
  templateUrl: './division.component.html',
  styleUrls: ['./division.component.css']
})
export class DivisionComponent implements OnInit {

  constructor(private divisionService: MasterService, private snackBar: MatSnackBar) { }
  divisions = [];
  division = {};
  ngOnInit() {
    this.divisionService.getDivisions()
    .subscribe(
      res => this.divisions = res,
      err => console.log(err)
    );
    //console.log('from events username is :  '+localStorage.getItem('username'))
  }
  add(divName: string): void {
    divName=divName.trim();
    if (!divName) { return; }
    this.division = {"name": divName};
    this.divisionService.addDivision(this.division)
      .subscribe(division => {
        console.log("final: ",division);
        this.divisions.push(division);
        this.snackBar.open('Division added successfully', 'OK', {
          duration: 3000
        });
      },
      err => console.log(err));
  }

  delete(division): void {
    // this.heroes = this.heroes.filter(h => h !== hero);
    // this.heroService.deleteHero(hero).subscribe();
    const index: number = this.divisions.indexOf(division);
    this.divisionService.deleteDivision(division._id).subscribe((dd) => {
      // console.log(dd);
      if (index !== -1) {
        this.divisions.splice(index, 1);
      }
      this.snackBar.open('Division deleted successfully', 'OK', {
        duration: 3000
      });
      //console.log(dd);
    });
  }
}
