import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-charttest',
  templateUrl: './charttest.component.html',
  styleUrls: ['./charttest.component.css']
})


export class CharttestComponent implements OnInit {
  data = [];
  year = [];
  count = [];

  public lineChartData: Array<any> = [
    {data: this.count, label: 'Python Language'},
  ];
  public lineChartLabels: Array<any> = this.year;
  public lineChartOptions: any = {
    responsive: true
  };
  public lineChartColors: Array<any> = [
    {
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'red',
      pointBorderColor: 'red',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend: Boolean = true;
  public lineChartType: String = 'line';

  constructor() { }

  ngOnInit() {
    this.data = [
      {
          "name": "Ruby",
          "year": "2012",
          "count": "18117"
      },
      {
          "name": "Python",
          "year": "2012",
          "count": "100"
      },
      {
          "name": "Python",
          "year": "2014",
          "count": "200"
      },
      {
          "name": "Python",
          "year": "2016",
          "count": "300"
      },
      {
          "name": "Python",
          "year": "2018",
          "count": "100"
      },
      {
          "name": "JavaScript",
          "year": "2012",
          "count": "200"
      },
      {
          "name": "PHP",
          "year": "2012",
          "count": "14460"
      },
      {
          "name": "Java",
          "year": "2012",
          "count": "8006"
      },
      {
          "name": "C++",
          "year": "2012",
          "count": "4879"
      },
      {
          "name": "C",
          "year": "2012",
          "count": "4217"
      },
      {
          "name": "C#",
          "year": "2012",
          "count": "1866"
      },
      {
          "name": "Scala",
          "year": "2012",
          "count": "1848"
      },
      {
          "name": "Objective-C",
          "year": "2012",
          "count": "1674"
      },
      {
          "name": "Shell",
          "year": "2012",
          "count": "1284"
      },
      {
          "name": "HTML",
          "year": "2012",
          "count": "1272"
      },
      {
          "name": "Perl",
          "year": "2012",
          "count": "967"
      },
      {
          "name": "CoffeeScript",
          "year": "2012",
          "count": "793"
      },
      {
          "name": "Haskell",
          "year": "2012",
          "count": "723"
      },
          {
          "name": "Erlang",
          "year": "2012",
          "count": "644"
          },
          {
          "name": "CSS",
          "year": "2012",
          "count": "622"
          },
      {
          "name": "Emacs Lisp",
          "year": "2012",
          "count": "495"
      },
      {
          "name": "Clojure",
          "year": "2012",
          "count": "430"
      },
      {
          "name": "Lua",
          "year": "2012",
          "count": "344"
      },
      {
          "name": "Go",
          "year": "2012",
          "count": "324"
      },
      {
          "name": "Groovy",
          "year": "2012",
          "count": "210"
      },
      {
          "name": "Puppet",
          "year": "2012",
          "count": "189"
      },
      {
          "name": "VimL",
          "year": "2012",
          "count": "185"
      }];
    this.data.forEach(y => {
      this.year.push(y.year);
      this.count.push(y.count);
    });
  }

}
