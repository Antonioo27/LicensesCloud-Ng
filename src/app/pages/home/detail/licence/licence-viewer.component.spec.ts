import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LicenceViewerComponent } from './licence-viewer.component';

describe('HomeDetailComponent', () => {
  let component: LicenceViewerComponent;
  let fixture: ComponentFixture<LicenceViewerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LicenceViewerComponent]
    });
    fixture = TestBed.createComponent(LicenceViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
