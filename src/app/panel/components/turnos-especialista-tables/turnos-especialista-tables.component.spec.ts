import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TurnosEspecialistaTablesComponent } from './turnos-especialista-tables.component';

describe('TurnosEspecialistaTablesComponent', () => {
  let component: TurnosEspecialistaTablesComponent;
  let fixture: ComponentFixture<TurnosEspecialistaTablesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TurnosEspecialistaTablesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TurnosEspecialistaTablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
