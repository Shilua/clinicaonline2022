import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaPacientesComponent } from './vista-pacientes.component';

describe('VistaPacientesComponent', () => {
  let component: VistaPacientesComponent;
  let fixture: ComponentFixture<VistaPacientesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VistaPacientesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VistaPacientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
