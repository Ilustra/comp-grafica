import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { DisplayFile } from 'src/app/bussines/displayFile';
import { Janela } from 'src/app/bussines/Janela';
import { Poligono } from 'src/app/bussines/Poligono';
import { Ponto } from 'src/app/bussines/Ponto';
import { DisplayfileService } from 'src/app/service/displayfile.service';

@Component({
  selector: 'app-ccanva',
  templateUrl: './ccanva.component.html',
  styleUrls: ['./ccanva.component.css']
})


export class CCanvaComponent implements OnInit {


  mundo: Janela = new Janela(-250,-250, 250, 250);
  viewPort:Janela = new Janela(0, 0, 500, 500);
  poligono:  Poligono = new Poligono();
  pontoAux: Ponto;
  displayFile: DisplayFile = new DisplayFile;

  @ViewChild('canvas', { static: true })

  public canvas!: ElementRef<HTMLCanvasElement>;
  public ctx: any;
  changeText: boolean;
  public positionViewport:any = {x: 0, y:0, newX: 0, newY:0};

  constructor(private displayService: DisplayfileService) {       
    this.changeText = false;  
  }

  async ngOnInit() {
    this.ctx = this.canvas.nativeElement.getContext('2d');
    this.desenha()
    
  }

  desenha(){
    this.ctx.moveTo(250, 0);
    this.ctx.lineTo(250, 500);
    this.ctx.moveTo(0,250);
    this.ctx.lineTo(500, 250);
    this.ctx.stroke();
  }

  private insertPoligono: boolean = false;

  onInsertPoligono(){
    if(!this.insertPoligono){
      this.insertPoligono = !this.insertPoligono;
      this.displayFile.poligonos.push(new Poligono());
    }else {
      this.displayFile.poligonos.push(new Poligono());
    }
  }
  onViewPortToMundo(x: number, y:number, mundo: Janela, viewPort:Janela){
    const newX = ((x - viewPort.xMin) / (viewPort.xMax - viewPort.xMin)) * (mundo.xMax - mundo.xMin)+mundo.xMin;
    const newY =  (1-((y-viewPort.yMin)/(viewPort.yMax - viewPort.yMin)))*(mundo.yMax - mundo.yMin)+mundo.yMin
    return {'newX': newX, 'newY': newY, 'x': x, 'y': y}
  }

  onMouseMove(e: any){
    this.positionViewport = this.onViewPortToMundo(e.x, e.y, this.mundo, this.viewPort);
  }
  clearPainel(){
    this.ctx.clearRect(0,0, 500, 500)
    this.ctx.beginPath();
    // this.ctx.restore();
    this.displayFile.clear();;
    this.desenha();
  }
  onClick(e: any){
    if(this.insertPoligono){
      const t = this.displayFile.poligonos.length-1;
      this.displayFile.poligonos[t].pontos.push(new Ponto(e.x, e.y))
      this.ctx.clearRect(0,0, 500, 500)
      this.ctx = this.displayFile.poligonos[t].desenha(this.ctx)
      
    }

  }
  plot(x:number, y:number){
    //this.ctx.moveTo(x,y); 
    this.ctx.lineTo(x,y); 
    this.ctx.stroke();
  }
  desenhaLinhaOctante(x1: number, y1: number, x2: number, y2: number){
    let x = x1;
    let y = y1;
    let deltaX = x2-x1;
    let deltaY = y2-y1;
    let e = 2*deltaY - deltaX;
    for(let i = 1; i<= deltaX; i++){
      this.plot(x, y);
      if(e>0){
        y++;
        e-=2*deltaX
      } x++;
      e+=2*deltaY;
    }
  }
  desenhaLinhaInteiro(x1: number, y1: number, x2: number, y2: number){
    let deltax = Math.abs((x2-x1))
    let deltaY = Math.abs((y2-y1));
    let signalX = Math.sign((x2-x1));
    let signalY = Math.sign((y2-y1));
    let x = x1;
    let y = y1;
    if(signalX<0)
      x-=1;
      if(signalY<0)
      y-=1;
    let interchange = false;
    if(deltaY >deltax){
      let tmp = deltax;
      deltax = deltaY;
      deltaY = tmp
      interchange = true;
    }
    let erro = 2*deltaY - deltax;
  }


  DesenhaPontoCircunferencia(x: number, y: number): Poligono{
    const pol = new Poligono();

    pol.pontos.push(new Ponto(x,y));
    pol.pontos.push(new Ponto(-x,y));

    pol.pontos.push(new Ponto(y,x));
    pol.pontos.push(new Ponto(y, -x));

    pol.pontos.push(new Ponto(x, -y));
    pol.pontos.push(new Ponto(-x, -y));

    pol.pontos.push(new Ponto(-y, -x));
    pol.pontos.push(new Ponto(-y, x));
    return pol;

  }
  
  onCircle(xc: number, yc: number, r: number){
      let x = 0;
      let y = r;
      let pol: Poligono[]=[];
      pol.push(this.DesenhaPontoCircunferencia(xc+x, yc+y));
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
          pol.push(this.DesenhaPontoCircunferencia(xc+x, yc+y));
      }
    this.displayFile.poligonos = pol;

  }
  
}