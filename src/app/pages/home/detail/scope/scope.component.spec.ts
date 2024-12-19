import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScopeComponent } from './scope.component';

describe('ScopeComponent', () => {
  let component: ScopeComponent;
  let fixture: ComponentFixture<ScopeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ScopeComponent]
    });
    fixture = TestBed.createComponent(ScopeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
