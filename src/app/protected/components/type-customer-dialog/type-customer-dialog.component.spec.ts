import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeCustomerDialogComponent } from './type-customer-dialog.component';

describe('TypeCustomerDialogComponent', () => {
  let component: TypeCustomerDialogComponent;
  let fixture: ComponentFixture<TypeCustomerDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypeCustomerDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeCustomerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
