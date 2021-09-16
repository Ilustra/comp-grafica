import { ElementRef } from "@angular/core";
import { Guid } from "guid-typescript";
import { Observable } from "rxjs";
import { TIPO_POLIGONO } from "./enum";
import { Janela } from "./Janela";
import { onGuid } from "./onGuid";
import { Poligono } from "./Poligono";

export class DisplayFile{

    public id: Guid
    public poligonos: Poligono[] ;

    constructor(){ this.id = onGuid(); 
    this.poligonos = []
}

    public canvas!: ElementRef<HTMLCanvasElement>;
    public ctx: any

    onDesenha(ctx: any, mundo:Janela, viewPort: Janela){
        return this.poligonos.map(elemnt => {
            if(elemnt.tipo == TIPO_POLIGONO.vector)
                 elemnt.desenha(ctx, mundo, viewPort)
            if(elemnt.tipo == TIPO_POLIGONO.eixoX || elemnt.tipo == TIPO_POLIGONO.eixoY)
                 elemnt.desenha(ctx, mundo, viewPort)
            if(elemnt.tipo == TIPO_POLIGONO.elipse)
                 elemnt.desenha(ctx, mundo, viewPort)
            if(elemnt.tipo == TIPO_POLIGONO.dda){
                elemnt.desenhaDDA(ctx, mundo, viewPort)
            }
                
        })
    }
    clear(){
        this.poligonos = []
    }
    cliping(areaCliping: Janela){
        this.poligonos.forEach(element=>{
            if(element.tipo != TIPO_POLIGONO.eixoX && element.tipo!=TIPO_POLIGONO.eixoY){
                let t = element.cliping(areaCliping);
                if(t.pontos.length>0){
                    element.visible = false;
                    this.poligonos.push(t)
                }
      
            }

        })
    }
    onVisiblePoligono(id: Guid){
        this.poligonos.forEach(element=>{
            if(element.id == id)
                element.onVisiblePoligono();
        })
    }
    onRotateHomogenea(id:Guid, grau:number){
        this.poligonos.forEach(element=>{
            if(element.id == id){
               element.onRotateHomogenea(grau);
            }
        })
    }
}