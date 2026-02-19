import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobItemComponent } from './job-item.component';

describe('JobItemComponent', () => {
  let component: JobItemComponent;
  let fixture: ComponentFixture<JobItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JobItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobItemComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
