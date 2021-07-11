import { ElementRef, Injectable, ViewChild } from '@angular/core';
import { DisplayFile } from '../bussines/displayFile';
import { Poligono } from '../bussines/Poligono';
import { Ponto } from '../bussines/Ponto';

@Injectable({
  providedIn: 'root'
})
export class DisplayfileService {
  

  
  display: DisplayFile = new DisplayFile();
  public context: any;
  constructor() {}

  onDesenha(){
    this.context.moveTo(250, 0);
    this.context.lineTo(250, 500);
    this.context.moveTo(0,250);
    this.context.lineTo(500, 250);
    this.context.stroke();
  }
  onPonto(x:number, y:number, poligono: Poligono){
    return poligono.pontos.push(new Ponto(x,y));
  }
  onCreatePontCircun(pol: Poligono, xc: number, yc: number, x: number, y: number): Poligono{
    pol.pontos.push(new Ponto(xc + x, yc + y));
    pol.pontos.push(new Ponto(xc - x, yc + y));

    pol.pontos.push(new Ponto(xc + x, yc - y));
    pol.pontos.push(new Ponto(xc - x, yc - y));

    pol.pontos.push(new Ponto(xc + y, yc + x));
    pol.pontos.push(new Ponto(xc - y, yc + x));

    pol.pontos.push(new Ponto(xc + y, yc - x));
    pol.pontos.push(new Ponto(xc - y, yc - x));
    return pol;
  }
  onDesenhaPoligono(index: number){
      console.log(this.display)
      this.context.beginPath();
      this.display.poligonos[index].desenha(this.context);

  }
  //circulos
  onCircle(xc: number, yc: number, r: number){
    let x = 0;
    let y = r;
    let poli: Poligono = new Poligono();
    poli = this.onCreatePontCircun(poli, xc, yc, x, y);
      let p = r-1;
    while(x < y){
      if(p<0)
        x++;
      else {
        x++;
        y--;
      }
      if(p<0)
        p+=2*x+1;
      else
        p+=2*(x-y)+1;
        poli = this.onCreatePontCircun(poli, xc, yc, x, y);
    }
    this.context = poli.desenha(this.context);
  }

  //limpar canva
  onClear(){
    this.context.clearRect(0,0, 500, 500)
    this.context.beginPath();
     this.context.restore();
    this.display.clear();;
  }
}
