import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HumanResourcesComponent } from './human-resources.component';

describe('HumanResourcesComponent', () => {
  let component: HumanResourcesComponent;
  let fixture: ComponentFixture<HumanResourcesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HumanResourcesComponent]
    });
    fixture = TestBed.createComponent(HumanResourcesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
