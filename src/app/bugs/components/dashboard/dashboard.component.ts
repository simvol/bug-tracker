import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map, tap, filter } from 'rxjs/operators';

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
  isSmallScreen: boolean;
  isLargeScreen: boolean;
  isMediumScreen: boolean;
  size$: any;
  constructor(private breakpointObserver: BreakpointObserver) {}

  barChartData = [{ data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' }];

  ngOnInit() {
    this.monthlyReportSettings = {
      ...monthlyReportSettings,
      data: this.barChartData
    };

    this.size$ = this.breakpointObserver.observe([
      Breakpoints.Large,
      Breakpoints.Medium,
      Breakpoints.Small,
      Breakpoints.XSmall
    ]);
    this.size$
      .pipe(
        filter(result => result.breakpoints),
        map(result => result.breakpoints),
        tap(breakpoints => {
          if (breakpoints[Breakpoints.Medium] === true) {
            console.log('is medium');
          }
        })
      )
      .subscribe();
  }
}
