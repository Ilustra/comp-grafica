import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { i18nMetaToJSDoc } from '@angular/compiler/src/render3/view/i18n/meta';
import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Guid } from 'guid-typescript';
import { DisplayFile } from 'src/app/bussines/displayFile';
import { TIPO_POLIGONO } from 'src/app/bussines/enum';

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
  panelOpenState = false;

  poligono: Poligono = new Poligono();
  pontoAux: Ponto;
  displayFile: DisplayFile = new DisplayFile;

  @ViewChild('canvas', { static: true })
  //@ViewChild('canvapol')


  public canvas!: ElementRef<HTMLCanvasElement>;

  public ctx: any;
  private transladClick: Guid;
  changeText: boolean;

  constructor(public displayService: DisplayfileService, private formBuilder: FormBuilder) {

  }
  tipoPoligono: TIPO_POLIGONO;
  loginForm: FormGroup
  transladX: number
  poligonoId: Guid
  transladY: number
  angulo: number
  typeRotation: string = 'padrao'
  async ngOnInit() {
    this.displayService.onMundo(-250, -250, 250, 250);
    this.displayService.onViewPort(0, 0, 500, 500);

    this.displayService.onEixoCartesiano()

    this.displayService.context = this.canvas.nativeElement.getContext('2d');
    this.loginForm = this.formBuilder.group({
      id: [null],
      transladX: [null],
      transladY: [null],
      angulo: [null]
    });

    this.displayService.onDesenhaPoligono()
  }

  private insertPoligono: boolean = false;
  onInsertDDA(){
    if(this.insertPoligono){
      this.insertPoligono =!this.insertPoligono
      this.displayService.onNewPol(TIPO_POLIGONO.dda);
    }else{
      this.displayService.onNewPol(TIPO_POLIGONO.dda);
    }
  }
  onInsertPoligono(tipo: string) {
    if (!this.insertPoligono) {
      this.insertPoligono = !this.insertPoligono;
      if(tipo=='vector')
      this.displayService.onNewPol(TIPO_POLIGONO.vector);
      if(tipo=='dda')
      this.displayService.onNewPol(TIPO_POLIGONO.dda);
    } else {
      if(tipo=='vector')
      this.displayService.onNewPol(TIPO_POLIGONO.vector);
      if(tipo=='dda')
      this.displayService.onNewPol(TIPO_POLIGONO.dda);
    }
  }


  onMouseMove(e: any) {
    this.displayService.onViewPortToMundo(e.x, e.y);
  }
  clearPainel() {
    this.displayService.onClear();
    this.displayService.onMundo(-250, -250, 250, 250);
    this.displayService.onViewPort(0, 0, 500, 500);
    this.displayService.onEixoCartesiano()
    this.displayService.onDesenhaPoligono()
  }

  onClick(e: any) {
    if (this.insertPoligono) {
      this.displayService.onPushPontos(this.displayService.poligono.id, this.displayService.positionViewport.newX, this.displayService.positionViewport.newY);
      this.displayService.onDesenha()
    }
  }
  plot(x: number, y: number) {

    this.ctx.lineTo(x, y);
    this.ctx.stroke();
  }
  desenhaLinhaOctante(x1: number, y1: number, x2: number, y2: number) {
    let x = x1;
    let y = y1;
    let deltaX = x2 - x1;
    let deltaY = y2 - y1;
    let e = 2 * deltaY - deltaX;
    for (let i = 1; i <= deltaX; i++) {
      this.plot(x, y);
      if (e > 0) {
        y++;
        e -= 2 * deltaX
      } x++;
      e += 2 * deltaY;
    }
  }
  desenhaLinhaInteiro(x1: number, y1: number, x2: number, y2: number) {
    let deltax = Math.abs((x2 - x1))
    let deltaY = Math.abs((y2 - y1));
    let signalX = Math.sign((x2 - x1));
    let signalY = Math.sign((y2 - y1));
    let x = x1;
    let y = y1;
    if (signalX < 0)
      x -= 1;
    if (signalY < 0)
      y -= 1;
    let interchange = false;
    if (deltaY > deltax) {
      let tmp = deltax;
      deltax = deltaY;
      deltaY = tmp
      interchange = true;
    }
    let erro = 2 * deltaY - deltax;
  }
  onCirc(xc: number, yc: number, r: number) {
    this.displayService.onCircle(xc, yc, r);
    this.displayService.onDesenha()
  }

  onTransLad(id: Guid, dx: number, dy: number) {
    this.displayService.display.poligonos.forEach((value, index) => {
      if (value.id == id) {
        value.onTranslado(dx, dy);
      }
    })
    this.displayService.onDesenha();
  }
  onReflete(id: Guid, x: number, y: number){
    this.displayService.onReflete(id, x, y);
    this.displayService.onDesenha()
  }
  onRotation(id: Guid, angulo: number, type: string) {

    if(type == 'homogenea')
    this.displayService.onRotationHomogenea(id, angulo);
    else if(type == "padrao")
    this.displayService.onRatationPoligono(id, angulo);


    this.displayService.onDesenha();
  }

  onClickTranslad(id: Guid) {
    this.transladClick = id;
    this.insertPoligono = false;
  }
  onZoomIn(xmin: number, ymin: number, xmax: number, ymax: number) {
    this.displayService.onZoomPlus(xmin, xmax, ymin, ymax);
  }
  onMoviment(top: number, bottom: number, left: number, rigth: number) {
    this.displayService.onMoviment(top, bottom, left, rigth)
    this.displayService.onDesenha();
  }
  onCliping(areaXmin: number, areaYmin: number, areaXmax: number, areaYmax: number) {
    const areaclipi = new Janela(areaXmin, areaYmin, areaXmax, areaYmax);
    this.displayService.cliping(areaclipi)
  }
  onVisiblePoligono(id: Guid) {
    this.displayService.display.onVisiblePoligono(id);
    this.displayService.onDesenha()
  }
}
