import { Guid } from "guid-typescript";
import { Janela } from "./Janela";
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
    xWvp(mundo: Janela, viewPort: Janela){
       return ( (this.x - mundo.xMin) / (mundo.xMax - mundo.xMin)   ) 
        * (viewPort.xMax - viewPort.xMin);
    }
    
    yWvp(mundo: Janela, viewPort: Janela){
        return (1-((this.y-mundo.yMin)/(mundo.yMax - mundo.yMin)) )
         *(viewPort.yMax - viewPort.yMin);
    }

    onTranslad(deslocamentoX: number, deslocamentoY:number){
        this.x +=  deslocamentoX
        this.y +=  deslocamentoY;
    }
    onReflet(newX:number, newY:number){
        this.x *= newX;
        this.y *=newY;
    }
    onRotation(angulo:number){
        let teta = angulo *(Math.PI/180)
        let xold = this.x;

        this.x = (this.x * Math.cos(teta))-(this.y *Math.sin(teta));
        this.y = (xold*Math.sin(teta))+(this.y*Math.cos(teta));
    }

    cohen(janela: Janela){
 
      let code = '';

      let x = this.x;
      let y = this.y;

      if(y > janela.yMax)
      code = code + '1';
      else
      code = code + '0';

      if(y < janela.yMin)
      code = code + '1';
      else
      code = code + '0';

      if(x > janela.xMax)
      code = code + '1';
      else
      code = code + '0';

      if(x < janela.xMin)
         code = code + '1';
      else
      code = code + '0';

      return code
    }

    xM(mundo: Janela, viewPort: Janela){
       return ((this.x - viewPort.xMin) / (viewPort.xMax - viewPort.xMin)) * (mundo.xMax - mundo.xMin)+mundo.xMin;
    }
    yM(mundo: Janela, viewPort: Janela){
    return (1-((this.y-viewPort.yMin)/(viewPort.yMax - viewPort.yMin)))*(mundo.yMax - mundo.yMin)+mundo.yMin

      }
}