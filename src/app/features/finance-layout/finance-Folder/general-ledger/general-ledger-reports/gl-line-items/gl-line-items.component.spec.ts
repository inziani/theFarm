import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlLineItemsComponent } from './gl-line-items.component';

describe('GlLineItemsComponent', () => {
  let component: GlLineItemsComponent;
  let fixture: ComponentFixture<GlLineItemsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GlLineItemsComponent]
    });
    fixture = TestBed.createComponent(GlLineItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
