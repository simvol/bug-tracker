import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-info-box',
  template: `
    <div class="container component-container">
      <div class="header">
        <span>{{ title }}</span> <i class="icon fas fa-{{ icon }}"></i>
      </div>
      <div class="content">
        <ng-content></ng-content>
      </div>
      <div class="footer">
        <i
          class="fas fa-{{
            isFooterPositive ? 'arrow-up positive' : 'arrow-down negative'
          }}"
        ></i>
        <span>{{ footerText }}</span>
      </div>
    </div>
  `,
  styleUrls: ['./info-box.component.scss']
})
export class InfoBoxComponent implements OnInit {
  @Input() title: string;
  @Input() icon: string;
  @Input() isFooterPositive: boolean;
  @Input() footerText: string;
  @Input() isCenteredContent: boolean;

  constructor() {}

  ngOnInit() {}
}
