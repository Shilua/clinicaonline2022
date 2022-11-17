import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TurnosPacienteTablesComponent } from './turnos-paciente-tables.component';

describe('TurnosPacienteTablesComponent', () => {
  let component: TurnosPacienteTablesComponent;
  let fixture: ComponentFixture<TurnosPacienteTablesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TurnosPacienteTablesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TurnosPacienteTablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
