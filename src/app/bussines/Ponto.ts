import { Guid } from "guid-typescript";
import { onGuid } from "./onGuid";

export class Ponto{
    public id: number = 0;
    public x: number ;
    public y: number ;

    constructor(x: number, y: number){
        this.id = onGuid();
        this.x =x;
        this.y = y;
    }

    onCreate(x: number, y: number){
        this.x = x;
        this.y = y;
    }
}