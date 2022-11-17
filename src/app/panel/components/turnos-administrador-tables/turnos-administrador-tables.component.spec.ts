import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TurnosAdministradorTablesComponent } from './turnos-administrador-tables.component';

describe('TurnosAdministradorTablesComponent', () => {
  let component: TurnosAdministradorTablesComponent;
  let fixture: ComponentFixture<TurnosAdministradorTablesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TurnosAdministradorTablesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TurnosAdministradorTablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
