import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-complete-the-word',
  templateUrl: './complete-the-word.component.html',
  styleUrls: ['./complete-the-word.component.css']
})
export class CompleteTheWordComponent implements OnInit {

  palabras: string[] = [ 'humano','persona','gente','hombre','mujer','bebe','ladrillo', 'espejo',
  'adolescente','adulto', 'adulta','anciano', 'anciana', 'muslo','cabeza','cara',
  'boca','labio','diente','ojo','nariz','barba','bigote','cabello','oreja','cerebro',
  'estomago', 'brazo', 'matrimonio', 'amor', 'padre', 'madre', 'hermano', 'hermana',
  'hijo', 'hija', 'abuelo', 'abuela', 'bisabuelo', 'bisabuela', 'nieto', 'nieta', 'conejo',
  'dragon', 'ciervo', 'rana', 'leon', 'jirafa', 'elefante', 'pajaro', 'gallina',
  'gorrion', 'cuervo', 'aguila'  ]

  letraCorrecta : string = '';
  index!:number;
  contador : number = 0;
  letra:string = '';
  palabra:string = ''

  @Output() completeWord_ouput:EventEmitter<any> = new EventEmitter<any>()

  constructor() { }

  ngOnInit(): void {
    this.empezar()
  }

  getRandomInt(min:number, max:number) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

   empezar(){
    let pal;
    do{
     pal = this.getRandomInt(0, this.palabras.length);
    }while(pal == this.index)
     this.index = pal;
     let palabraElegida = this.palabras[pal];
     let guion = this.getRandomInt(0, palabraElegida.length);
     let splitPalabra = palabraElegida.split("");
     this.letraCorrecta = splitPalabra[guion]
     splitPalabra[guion] = '_'
     palabraElegida = splitPalabra.join("");
     this.palabra = palabraElegida
   }

   comprobar(){
    this.completeWord_ouput.emit(true)
   }

   cancel(){
     this.completeWord_ouput.emit(false)
   }

   skip(){
    this.completeWord_ouput.emit(true)
  }
}
