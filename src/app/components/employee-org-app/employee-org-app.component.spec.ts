import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeOrgAppComponent } from './employee-org-app.component';

describe('EmployeeOrgAppComponent', () => {
  let component: EmployeeOrgAppComponent;
  let fixture: ComponentFixture<EmployeeOrgAppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeOrgAppComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeOrgAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
