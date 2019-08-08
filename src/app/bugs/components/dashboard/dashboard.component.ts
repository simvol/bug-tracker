import { Component, OnInit } from '@angular/core';

const monthlyReportSettings = {
  options: {
    scaleShowVerticalLines: false,
    responsive: true
  },
  labels: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ],
  type: 'bar',
  isLegend: true,
  data: []
};

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  monthlyReportSettings: any;

  constructor() {}

  barChartData = [{ data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' }];

  ngOnInit() {
    this.monthlyReportSettings = {
      ...monthlyReportSettings,
      data: this.barChartData
    };
  }
}
