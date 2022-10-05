import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoggingDemoComponent } from './logging-demo.component';

describe('LoggingDemoComponent', () => {
  let component: LoggingDemoComponent;
  let fixture: ComponentFixture<LoggingDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoggingDemoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoggingDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
