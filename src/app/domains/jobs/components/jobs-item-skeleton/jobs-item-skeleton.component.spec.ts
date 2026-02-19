import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobsItemSkeletonComponent } from './jobs-item-skeleton.component';

describe('JobsItemSkeletonComponent', () => {
  let component: JobsItemSkeletonComponent;
  let fixture: ComponentFixture<JobsItemSkeletonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JobsItemSkeletonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobsItemSkeletonComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
