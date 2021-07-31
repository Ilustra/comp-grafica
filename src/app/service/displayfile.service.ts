import { ElementRef, Injectable, ViewChild } from '@angular/core';
import { Guid } from 'guid-typescript';
import { DisplayFile } from '../bussines/displayFile';
import { Janela } from '../bussines/Janela';
import { Poligono } from '../bussines/Poligono';
import { Ponto } from '../bussines/Ponto';

@Injectable({
  providedIn: 'root'
})
export class DisplayfileService {
  
 // mundo: Janela = new Janela(-250,-250, 250, 250);
  public mundo: Janela ;
//  viewPort:Janela = new Janela(0, 0, 500, 500);
  public viewPort:Janela ;
  
  display: DisplayFile = new DisplayFile();
  
  public context: any;
  public positionViewport: any = {x: 0, y:0, newX: 0, newY:0};

  public poligono: Poligono;
  constructor() {

  }
  onMundo(xmin: number, ymin: number,xmax: number,ymax:number){
    this.mundo = new Janela(xmin, ymin, xmax, ymax);
  }
  onViewPort(xmin: number, ymin: number,xmax: number,ymax:number){
    this.viewPort = new Janela(xmin, ymin, xmax, ymax);
  }

  onDesenha(){  
    this.onClearDisplay()
    this.context.beginPath();
    this.onDesenhaPoligono()
  }
  onEixoCartesiano(){
    let xPol = new Poligono()
    let yPol = new Poligono();
    xPol.tipo ='eixoX'
    yPol.tipo ='eixoY' 
    //eixo y 1 250 - 0 -250
    xPol.pontos.push(new Ponto(-250, 0))
    xPol.pontos.push(new Ponto(250, 0))

    yPol.pontos.push(new Ponto(0, 250))
    yPol.pontos.push(new Ponto(0, -250))

    this.display.poligonos.push(xPol)
    this.display.poligonos.push(yPol)
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
  
  onDesenhaPoligono(){
    this.onClearDisplay()
    this.display.onDesenha(this.context, this.mundo, this.viewPort);
    this.context.stroke()
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
    this.display.poligonos.push(poli);
    this.context.beginPath();
    this.context = poli.desenha(this.context, this.mundo, this.viewPort);
  }

  //limpar canva
  onClear(){
    this.onClearDisplay()
    this.context.beginPath();
    this.display.clear();;
  }  
  //limpar canva
  onClearDisplay(){
    this.context.clearRect(0,0, 500, 500)
    this.context.restore();
  }

  onViewPortToMundo(x: number, y:number){
    let newX = ((x - this.viewPort.xMin) / (this.viewPort.xMax - this.viewPort.xMin)) * (this.mundo.xMax - this.mundo.xMin)+this.mundo.xMin;
    let newY =  (1-((y-this.viewPort.yMin)/(this.viewPort.yMax - this.viewPort.yMin)))*(this.mundo.yMax - this.mundo.yMin)+this.mundo.yMin
  //  console.log('newy', newY)
    this.positionViewport = {'newX': newX, 'newY': newY, 'x': x, 'y': y}
  }
  onRatationPoligono(id: Guid, angulo:number){
    this.display.poligonos.forEach(value=>{
      if(value.id == id)
        value.onRotation(angulo);
    })
  }
  onRotationHomogenea(id: Guid, grau: number){
    
    this.display.onRotateHomogenea(id, grau);
  }
  reloadEixo(){
    this.display.poligonos.forEach(value=>{
      if(value.tipo =='eixoX'){
        value.pontos[0].x = this.mundo.xMax
        value.pontos[1].x = this.mundo.xMin
      }
      if(value.tipo=='eixoY'){
        value.pontos[0].y = this.mundo.yMax
        value.pontos[1].y = this.mundo.yMin
      }
    })
  }
  onZoomPlus(xmin: number, xmax: number, ymin: number, ymax: number){
    this.mundo.xMax += xmax;
    this.mundo.yMax += ymax;
    this.mundo.xMin += xmin;
    this.mundo.yMin += ymin;
    this.reloadEixo()
    this.onDesenha()
  }                                                                                           
  onMoviment(top: number, bottom: number, left: number, rigth: number){
    console.log(this.mundo)

    this.mundo.yMax +=top
    this.mundo.xMax += rigth;

    this.mundo.yMin +=bottom
    this.mundo.xMin += left;



    console.log(this.mundo)
    this.reloadEixo()
    this.onDesenha()

  }

  xWvp(mundo: Janela, viewPort: Janela, x: number){
    return ((x - mundo.xMin) / (mundo.xMax - mundo.xMin)   ) 
    * (viewPort.xMax - viewPort.xMin);
  }

  yWvp(mundo: Janela, viewPort: Janela, y:number){
    return (1- (  (y-mundo.yMin)/(mundo.yMax - mundo.yMin) )) *(viewPort.yMax - viewPort.yMin);
  }
  onNewPol(){
    this.poligono = new Poligono();
    this.display.poligonos.push(this.poligono);
  }
  onPushPontos(id: Guid, x: number, y:number){
    this.display.poligonos.forEach(value=>{
      if(value.id == id){
        value.pontos.push(new Ponto(x, y))
      }
    })
  }
  desenhaPonto(x: number, y: number){
    this.context.moveTo(x, y);
    this.context.lineTo(x, y);
    this.context.stroke()
  }
  cliping(janela: Janela){
    this.display.cliping(janela);
    this.onDesenha()
  }
}                                                                                         
