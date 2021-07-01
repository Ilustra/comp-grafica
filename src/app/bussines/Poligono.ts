import { ElementRef } from "@angular/core";
import { Guid } from "guid-typescript";
import { onGuid } from "./onGuid";
import { Ponto } from "./Ponto";

export class Poligono{


    public id: Guid ;
    public tipo: string='';
    public pontos: Ponto[];

    constructor(){
        this.id = onGuid();
        this.pontos=[];
     }

    desenha(ctx: any): any{
        for(let i=0; i < this.pontos.length ; i++){
             if(i == 0){
              ctx.moveTo(this.pontos[i].x, this.pontos[i].y);
             }
            else {
              ctx.lineTo(this.pontos[i].x, this.pontos[i].y);
            }
    
        }
        ctx.stroke();
        return ctx;
    }

}   