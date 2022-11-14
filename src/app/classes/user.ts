export class User {
    public id:string = '';
    public fistName:string = ''
    public lastName:string = ''
    public age:number = 0
    public dni:number = 0
    public obraSocial:string = ''
    public email:string = ''
    public profile:string = ''
    public speciality:Array<String> = []
    public password:string = ''
    public isActive:boolean = false;
    public profileImgOne:any;
    public profileImgTwo:any;
    public imageOne:string = ''
    public imageTwo:string = ''
    public isDelete:boolean = false;
    public days:Map<number,string> = new Map<number,string>();

    constructor(){

    }
}
