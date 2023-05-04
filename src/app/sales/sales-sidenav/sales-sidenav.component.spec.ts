import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesSidenavComponent } from './sales-sidenav.component';

describe('SalesSidenavComponent', () => {
  let component: SalesSidenavComponent;
  let fixture: ComponentFixture<SalesSidenavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalesSidenavComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalesSidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
