import { ElementRef } from "@angular/core";
import { Guid } from "guid-typescript";
import { Observable } from "rxjs";
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
    clear(){
        this.poligonos = []
    }

}