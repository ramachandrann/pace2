import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceLinesComponent } from './service-lines.component';

describe('ServiceLinesComponent', () => {
  let component: ServiceLinesComponent;
  let fixture: ComponentFixture<ServiceLinesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceLinesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceLinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
