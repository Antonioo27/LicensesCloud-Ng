import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalInfoViewerComponent } from './personal-info-viewer.component';

describe('PersonalInfoViewerComponent', () => {
  let component: PersonalInfoViewerComponent;
  let fixture: ComponentFixture<PersonalInfoViewerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PersonalInfoViewerComponent]
    });
    fixture = TestBed.createComponent(PersonalInfoViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
