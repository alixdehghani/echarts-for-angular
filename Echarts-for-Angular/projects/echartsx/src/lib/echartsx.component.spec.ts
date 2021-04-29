import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EchartsxComponent } from './echartsx.component';

describe('EchartsxComponent', () => {
  let component: EchartsxComponent;
  let fixture: ComponentFixture<EchartsxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EchartsxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EchartsxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
