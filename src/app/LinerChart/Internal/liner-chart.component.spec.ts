import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinerChartComponent } from './liner-chart.component';

describe('LinerChartComponent', () => {
  let component: LinerChartComponent;
  let fixture: ComponentFixture<LinerChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LinerChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LinerChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
