import { ElementRef } from "@angular/core";
import { Guid } from "guid-typescript";
import { Janela } from "./Janela";
import { onGuid } from "./onGuid";
import { Ponto } from "./Ponto";

export class Poligono{


    public id: Guid ;
    public tipo: string='';
    public pontos: Ponto[];
    public visible: boolean
    constructor(){
        this.id = onGuid();
        this.pontos=[];
        this.visible = true;
    }
    onVisiblePoligono(){
        this.visible = !this.visible
    }
    desenha(ctx: any, mundo: Janela, viewPort:Janela): any{

        if(this.visible){
            
            for(let i=0; i < this.pontos.length ; i++){
               
                if(i==0){
                    ctx.moveTo(this.pontos[i].xWvp(mundo, viewPort), this.pontos[i].yWvp(mundo, viewPort));
                }else{
                    ctx.lineTo(this.pontos[i].xWvp(mundo, viewPort), this.pontos[i].yWvp(mundo, viewPort));
                }
            }
            return ctx;
        }
    }
    
    onTranslado(descolamentoX: number, descolamentoY:number){
        this.pontos.forEach(value=>{
            value.onTranslad(descolamentoX, descolamentoY);
        })
    }

    onRotation(angulo:number){
        this.pontos.forEach(value=>{
            value.onRotation(angulo);
        })
    }

    find_intersection(outcode: string, p1: Ponto, p2: Ponto, janela: Janela)
    {

        let x1 = p1.x;
        let x2 = p2.x;
        let y1 = p1.y;
        let y2 = p2.y;

       let intersections_list = []
    
        let m = (y2-y1)/(x2-x1);
        let pEsquerda = new Ponto(janela.xMin, m*(janela.xMin-x1)+y1);
        let pDireita = new Ponto(janela.xMax, m*(janela.xMax-x1)+y1);
        let pTopo = new Ponto(x1+(1/m)*(janela.yMax-y1),janela.yMax);
        let pFundo = new Ponto(x1+(1/m)*(janela.yMin-y1), janela.yMin);
        
        if(pEsquerda.y >= janela.yMin && pEsquerda.y <= janela.yMax)
            intersections_list.push(pEsquerda);
        if(pDireita.y >= janela.yMin && pDireita.y <= janela.yMax)
            intersections_list.push(pDireita)
        if(pTopo.x > janela.xMin && pTopo.x <= janela.xMax)
            intersections_list.push(pTopo);
        if(pFundo.x > janela.xMin && pFundo.x <= janela.xMax)
            intersections_list.push(pFundo);
        return intersections_list
    }
    cliping(areaCliping: Janela): Poligono{
        let pol = new Poligono()
        pol.tipo = 'cliping';
        for(let i =0; i < this.pontos.length-1; i++){
            //New variables to hold end points. No relation 
				//to global 'start' and 'end'
				let start_ = this.pontos[i];
			    let	end_ = this.pontos[i+1];    

                let o1 = start_.cohen(areaCliping);
				let o2 = end_.cohen(areaCliping);
                console.log('o1 o2 and', o1, o2, (parseInt(o1)&parseInt(o2)))
				//Ambos os códigos de saída são 0. Isso significa que ambos os pontos finais estão dentro da janela de visualização
				if(o1 == '0000' && o2 == '0000'){
					console.log('accept');
                    pol.pontos.push(start_)
                    pol.pontos.push(end_)
                }
				//ambos os códigos de saída têm o mesmo conjunto de bits quando ambos os pontos finais estão fora da janela de visualização
                // Um ​​ponto final dentro da janela de visualização e uma janela externa
                  else if( (parseInt(o1) & parseInt(o2)) == 0)
                {
                    pol.pontos = this.find_intersection(o1, this.pontos[i], this.pontos[i+1], areaCliping);
                }
     

			
        }
        return pol;
    }

    xWvp(mundo: Janela, viewPort: Janela, x: number){
        return ((x - mundo.xMin) / (mundo.xMax - mundo.xMin)   ) 
        * (viewPort.xMax - viewPort.xMin);
      }
    
      yWvp(mundo: Janela, viewPort: Janela, y:number){
        return (1- (  (y-mundo.yMin)/(mundo.yMax - mundo.yMin) )) *(viewPort.yMax - viewPort.yMin);
      }
}   