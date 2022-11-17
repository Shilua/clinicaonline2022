export class Turno {
    public id:string = '';
    public paciente:string = '';
    public especialista:string = '';
    public especialidad:string ='';
    public pacienteEmail:string = '';
    public especialistaEmail:string = '';
    public fecha:Date = new Date();
    public isDelete:boolean = false;
    public estado:string = ''
    public resenia:string = ''
    public puntuacion:number = 0
    public cancelado:string = ''
    public diagnostico:string = ''
    public historiaClinica:Map<any,any> = new Map<any,any>()

    constructor(){
        this.historiaClinica.set('altura','0 cm');
        this.historiaClinica.set('peso','0 kg');
        this.historiaClinica.set('presion','0');
        this.historiaClinica.set('temperatura','0 grados centigrados');

    }
}
