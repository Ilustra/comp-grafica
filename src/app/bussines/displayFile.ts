import { ElementRef } from "@angular/core";
import { Guid } from "guid-typescript";
import { Observable } from "rxjs";
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

        return this.poligonos.map(elemnt => elemnt.desenha(ctx, mundo, viewPort))
        
    }
    clear(){
        this.poligonos = []
    }
    cliping(areaCliping: Janela){
        this.poligonos.forEach(element=>{
            let t = element.cliping(areaCliping);
             this.poligonos.push(t)
        })
    }
    onVisiblePoligono(id: Guid){
        this.poligonos.forEach(element=>{
            if(element.id == id)
                element.onVisiblePoligono();
        })
    }
}