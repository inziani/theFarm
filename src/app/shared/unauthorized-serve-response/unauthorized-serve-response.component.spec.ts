import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnauthorizedServeResponseComponent } from './unauthorized-serve-response.component';

describe('UnauthorizedServeResponseComponent', () => {
  let component: UnauthorizedServeResponseComponent;
  let fixture: ComponentFixture<UnauthorizedServeResponseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnauthorizedServeResponseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnauthorizedServeResponseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
