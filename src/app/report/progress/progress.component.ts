import { AttendanceService } from './../../transervice/attendance.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatTableDataSource, MatSnackBar } from '@angular/material';
import { DataSource } from '@angular/cdk/collections';
export interface AttData {
  Month: string;
  Total: number;
  Present: number;
  Absent: number;
}
@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css']
})
export class ProgressComponent implements OnInit {
  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true,
    scales: {
      yAxes: [{
          ticks: {
              beginAtZero: true
          }
      }]
  }
  };
  displayedColumns: string[] = [ 'Month', 'Total', 'Present', 'Absent'];
  dataSource: MatTableDataSource<AttData>;
  tableData = [];

  public barChartLabels = ['Jan', 'Feb', 'Mar'];

  public barChartType = 'bar';
  public barChartLegend = true;
  att = [];
  chartLabel = [];
  chartData = [];
  chartData1 = [];
  _barChartData = [];
  public barChartData:any[] = [
    {data: [65, 59, 80], label: 'Total Days'},
    {data: [28, 48, 40], label: 'Total Present'}
  ];
  // public barChartLabels: Array<any> = this.chartLabel;
  // public barChartData: Array<any> = [
  //   {data: this.chartData1, label: 'total days'},
  //   {data: this.chartData, label: 'absents'},
  // ];
  monthNames = ['Jan', 'Feb', 'Mar', 'April', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  constructor(private attendacneService: AttendanceService, private router: Router, private route: ActivatedRoute) {
   }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.randomize(params.id);
    });
  }

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

  public randomize(id): void {
    if (localStorage.getItem('academic')) {

    } else {
      return;
    }
    const param = `${id}|${localStorage.getItem('academic')}|''`;
    this.attendacneService.getAttendanceByMonth(param)
    .subscribe((res) => {
        console.log(res);
        this.att = res;
        if (this.att.length > 0)
        {
          console.log(this.att[0]._id.month);
          let counter = 0;
          this.barChartLabels.length = 0;
          let atten: AttData;
          this.att.forEach(element => {
            this.chartLabel.push(this.monthNames[element._id.month - 1]);
            this.chartData.push(element._id.workedDays - element.count);
            this.chartData1.push(element._id.workedDays);
            this.barChartLabels.push(this.monthNames[element._id.month - 1]);
            atten = {
              Month: this.monthNames[element._id.month - 1],
              Total: element._id.workedDays,
              Present: element._id.workedDays - element.count,
              Absent: element.count
            };
            this.tableData.push(atten);
            counter++;
          });
          // this.barChartLabels.reverse();
          // console.log(this.chartLabel);
          // console.log(this.chartData);
          // console.log(this.chartData1);
          // console.log('table');
          // console.log(this.tableData);
          this.dataSource = new MatTableDataSource(this.tableData);
          this._barChartData.push ({data: new Array(this.chartData.length), label: 'Total Days'});
          this._barChartData.push ({data: new Array(this.chartData.length), label: 'Total Present'});
          for (let j = 0; j < this.chartData.length; j++) {
            this._barChartData[0].data[j] = this.chartData1[j];
            this._barChartData[1].data[j] = this.chartData[j];
          }
          this.barChartData = this._barChartData;
          //  this.barChartLabels.length = 0;
          // this.barChartLabels = this.chartLabel;
          // console.log(this._barChartData);
          // console.log(this.barChartData);
          // console.log(this.barChartLabels);
        }
      },
        err => console.log(err)
    );
  }
}
