import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';
import { FirebaseDatePipe } from './firebase-date.pipe';
import { Component } from '@angular/core';

// TestBed.initTestEnvironment(
//   BrowserDynamicTestingModule,
//   platformBrowserDynamicTesting()
// );

describe('Shallow FirebaseDatePipe test', () => {
  @Component({
    template: `
      Date: {{ date | firebaseDate }}
    `
  })
  class TestComponent {
    date = { seconds: 1564383600 };
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FirebaseDatePipe, TestComponent]
    }).compileComponents();
  }));

  it('should convert firebase date to javascript date', () => {
    const fixture = TestBed.createComponent(TestComponent);
    const component = fixture.componentInstance;
    const el = fixture.nativeElement;
    console.log(el.textContent);
    expect(el.textContent).toContain(new Date(1564383600 * 1000).toString());
  });

  // it('should return todays date if input is invalid', () => {
  //   expect(pipe.transform({})).toEqual(new Date());
  // });
});

describe('Isolate FirebaseDatePipe test', () => {
  const pipe = new FirebaseDatePipe();

  it('should convert firebase date to javascript date', () => {
    expect(pipe.transform({ seconds: 1564383600 })).toEqual(
      new Date(1564383600 * 1000)
    );
  });

  it('should return todays date if input is invalid', () => {
    expect(pipe.transform({})).toEqual(new Date());
  });
});
