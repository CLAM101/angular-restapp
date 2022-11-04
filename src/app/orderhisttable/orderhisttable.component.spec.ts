import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderhisttableComponent } from './orderhisttable.component';

describe('OrderhisttableComponent', () => {
  let component: OrderhisttableComponent;
  let fixture: ComponentFixture<OrderhisttableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderhisttableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderhisttableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
