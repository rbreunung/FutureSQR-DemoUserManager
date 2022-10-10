import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-logging-demo',
  templateUrl: './logging-demo.component.html',
  styleUrls: ['./logging-demo.component.css']
})
export class LoggingDemoComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  logDemoErrorMessage() {
    console.error("Hello Error World");
  }

  logDemoLogMessage() {
    console.log("Hello Log World");
  }

  logDemoWarnMessage() {
    console.warn("Hello Warn World");
  }
}
