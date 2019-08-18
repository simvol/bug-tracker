import { Component, OnInit } from '@angular/core';

const materialColors = [
  '#ffc107',
  '#ff5722',

  '#F0D78C',
  '#4F81C7',
  '#e91e63',

  '#378060',
  '#003A87',
  '#34C040',
  '#4caf50',
  '#8bc34a',
  '#9c27b0',

  '#526CFE',
  '#FF4653',
  '#42C3AF',
  '#B6BAC3',
  '#009688',

  '#6055CD',
  '#9C9EB9',

  '#6784FF',
  '#626679'
];

const monthlyReportSettings = {
  options: {
    scaleShowVerticalLines: false,
    responsive: true,
    maintainAspectRatio: false
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
  isLegend: false,
  data: []
};

const dailyReportSettings = {
  options: {
    responsive: true,
    maintainAspectRatio: false
  },
  labels: [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
  ],
  type: 'line',
  isLegend: false,
  data: []
};

const errorTypeReportSettings = {
  options: {
    responsive: true,
    maintainAspectRatio: false,
    legend: {
      position: 'bottom'
    }
  },
  labels: [
    'Uncaught TypeError',
    '‘undefined’ is not an object',
    'null is not an object',
    'Script error',
    'Object doesn’t support property',
    '‘undefined’ is not a function',
    'Maximum call stack',
    'Cannot read property ‘length’'
  ],
  type: 'doughnut',
  isLegend: true,
  data: []
};

// Material
// e91e63 9c27b0 673ab7 2196f3 00bcd4 03a9f4 009688 4caf50

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  monthlyReportSettings: any;
  dailyReportSettings: any;
  errorTypeReportSettings: any;

  constructor() {}

  barChartData = [
    {
      data: [65, 59, 80, 81, 56, 55, 40],
      backgroundColor: materialColors
    }
  ];
  lineChartData = [
    {
      data: [1, 3, 5, 4, 3, 3, 0],
      backgroundColor: materialColors[3],
      borderColor: materialColors[20]
    }
  ];
  doughnutChartData = [
    {
      data: [1, 2, 1, 4, 2, 5, 1, 3],
      backgroundColor: materialColors
    }
  ];

  ngOnInit() {
    this.monthlyReportSettings = {
      ...monthlyReportSettings,
      data: this.barChartData
    };

    this.dailyReportSettings = {
      ...dailyReportSettings,
      data: this.lineChartData
    };

    this.errorTypeReportSettings = {
      ...errorTypeReportSettings,
      data: this.doughnutChartData
    };
  }
}
