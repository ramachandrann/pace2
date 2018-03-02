/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { OrderingProviderInfoComponent } from './ordering-provider-info.component';

describe('OrderingProviderInfoComponent', () => {
  let component: OrderingProviderInfoComponent;
  let fixture: ComponentFixture<OrderingProviderInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderingProviderInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderingProviderInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
