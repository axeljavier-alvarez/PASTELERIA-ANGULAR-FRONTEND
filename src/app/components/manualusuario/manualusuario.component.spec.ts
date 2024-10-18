import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManualusuarioComponent } from './manualusuario.component';

describe('ManualusuarioComponent', () => {
  let component: ManualusuarioComponent;
  let fixture: ComponentFixture<ManualusuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManualusuarioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManualusuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
