import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterDataReportComponent } from './master-data-report.component';

describe('MasterDataReportComponent', () => {
  let component: MasterDataReportComponent;
  let fixture: ComponentFixture<MasterDataReportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MasterDataReportComponent]
    });
    fixture = TestBed.createComponent(MasterDataReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
