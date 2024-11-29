import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LicenceMgrComponent } from './licence-mgr.component';

describe('LicenceMgrComponent', () => {
  let component: LicenceMgrComponent;
  let fixture: ComponentFixture<LicenceMgrComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LicenceMgrComponent]
    });
    fixture = TestBed.createComponent(LicenceMgrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
