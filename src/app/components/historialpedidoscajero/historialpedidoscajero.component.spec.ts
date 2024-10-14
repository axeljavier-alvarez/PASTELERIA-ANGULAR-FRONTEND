import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorialpedidoscajeroComponent } from './historialpedidoscajero.component';

describe('HistorialpedidoscajeroComponent', () => {
  let component: HistorialpedidoscajeroComponent;
  let fixture: ComponentFixture<HistorialpedidoscajeroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistorialpedidoscajeroComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistorialpedidoscajeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
