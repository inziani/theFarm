import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesOrderProcessComponent } from './sales-order-process.component';

describe('SalesOrderProcessComponent', () => {
  let component: SalesOrderProcessComponent;
  let fixture: ComponentFixture<SalesOrderProcessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalesOrderProcessComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalesOrderProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
