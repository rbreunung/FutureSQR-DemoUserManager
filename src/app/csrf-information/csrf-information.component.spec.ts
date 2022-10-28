import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CsrfInformationComponent } from './csrf-information.component';

describe('CsrfInformationComponent', () => {
  let component: CsrfInformationComponent;
  let fixture: ComponentFixture<CsrfInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [CsrfInformationComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CsrfInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
