import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SayHelloComponent } from './say-hello.component';

describe('SayHelloComponent', () => {
  let component: SayHelloComponent;
  let fixture: ComponentFixture<SayHelloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, FormsModule, ReactiveFormsModule],
      declarations: [SayHelloComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SayHelloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
