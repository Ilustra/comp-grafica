import { ElementRef } from "@angular/core";
import { Guid } from "guid-typescript";
import { TIPO_POLIGONO } from "./enum";
import { Janela } from "./Janela";
import { onGuid } from "./onGuid";
import { Ponto } from "./Ponto";

export class Poligono {


    public id: Guid;
    public tipo: TIPO_POLIGONO = TIPO_POLIGONO.vector;
    public pontos: Ponto[];
    public visible: boolean;
    public selected: boolean;
    constructor() {
        this.id = onGuid();
        this.pontos = [];
        this.visible = true;
        this.selected = false;
    }
    onVisiblePoligono() {
        this.visible = !this.visible
    }
    desenha(ctx: any, mundo: Janela, viewPort: Janela): any {
        if (this.visible) {
            for (let i = 0; i < this.pontos.length; i++) {

                if (i == 0) {
                    ctx.moveTo(this.pontos[i].xWvp(mundo, viewPort), this.pontos[i].yWvp(mundo, viewPort));
                } else {
                    ctx.lineTo(this.pontos[i].xWvp(mundo, viewPort), this.pontos[i].yWvp(mundo, viewPort));
                }
            }
            return ctx;
        }
    }
    desenhaDDA(ctx: any, mundo: Janela, viewPort: Janela){
        let pontos: Ponto[]=[]
        for (let i = 1; i < this.pontos.length; i++) {
            let x1,x2,y1,y2;
            let length;
            let deltax,deltay,deltaDivx,deltaDivy;
            let x,y;
    
            x1 = this.pontos[i-1].Vpx(mundo,viewPort);
            y1 = this.pontos[i-1].Vpy(mundo,viewPort);
            x2 = this.pontos[i].Vpx(mundo,viewPort);
            y2 = this.pontos[i].Vpy(mundo,viewPort);
    
            deltax = x2-x1;
            deltay = y2-y1;
    
            if(Math.abs(deltax) >= Math.abs(deltay))
                length = Math.abs(deltax);
            else
                length = Math.abs(deltay);
    
            deltaDivx =  deltax / length;
            deltaDivy =  deltay / length;
            x = x1 + 0.5 * Math.sign(deltaDivx);
            y = y1 + 0.5 * Math.sign(deltaDivy);
    
            for (let i = 0; i < length; i++) {
                pontos.push(new Ponto(Math.floor(x), Math.floor(y)))
                x += deltaDivx;
                y += deltaDivy;
            }
        }
        if (this.visible) {
            for (let i = 0; i < pontos.length; i++) {
                if (i == 0) {
                    ctx.moveTo(pontos[i].x, pontos[i].y);
                } else {
                    ctx.lineTo(pontos[i].x, pontos[i].y);
                }
            }
            return ctx;
        }
    }
    onTranslado(descolamentoX: number, descolamentoY: number) {
        this.pontos.forEach(value => {
            value.onTranslad(descolamentoX, descolamentoY);
        })
    }

    onRotation(angulo: number) {
        this.pontos.forEach(value => {
            value.onRotation(angulo);
        })
    }
    onRotateHomogenea(grau: number) {
        let ponto_rotacionado = this.pontos
        let radiano = grau * Math.PI / 180

        let m_rotation = [[Math.cos(radiano), Math.sin(radiano), 0],    [-Math.sin(radiano), Math.cos(radiano), 0 ],    [0, 0, 1]] 
        let pCentro = this.centro(this.pontos);

        let dx = pCentro.x;
        let dy = pCentro.y;

        let  matrizTrans=[[1,0,0], [ 0,1,0],   [ dx,dy,1]];
        let matriz_TRN_negativa=[[1,0,0],  [ 0,1,0],   [-dx,-dy,1]]

        let M_xy= [[0,0,1]];
	    let M_auxiliar=[[0,0,1]];

        ponto_rotacionado = this.onMatriz133(M_auxiliar,M_xy,matriz_TRN_negativa, ponto_rotacionado);
        ponto_rotacionado = this.onMatriz133(M_auxiliar,M_xy,m_rotation, ponto_rotacionado);
        ponto_rotacionado = this.onMatriz133(M_auxiliar,M_xy,matrizTrans, ponto_rotacionado);
        this.pontos = ponto_rotacionado
    }
    onMatriz133(M_auxiliar: any, matriz1: any[1][3],  matriz2: any, pontos: Ponto[]){

        for(let i = 0; i<pontos.length; i++){
            matriz1[0][0] = pontos[i].x;
            matriz1[0][1] = pontos[i].y;
         
            for (let l=0; l < 1; l++){
                for (let c=0; c < 3; c++){
                M_auxiliar[l][c] = 0;
                    for (let w=0; w < 3; w++){
                        M_auxiliar[l][c] = M_auxiliar[l][c] + matriz1[l][w]
                                           * matriz2[w][c];
                    }
                }
            }
            pontos[i].x = M_auxiliar[0][0];
            pontos[i].y = M_auxiliar[0][1];
        }
        return pontos;
    }
    onReflete(x: number, y: number){
        this.pontos.forEach(value=>{
            value.onReflete(x, y);
        })
    }

    centro(pontos: Ponto[]){
        let somax=0;
        let somay=0;
    
        for(let i = 0; i<pontos.length; i++){
            somax += pontos[i].x;
            somay += pontos[i].y;
        }
    
        somax = somax / pontos.length;
        somay = somay / pontos.length;
    
        return new Ponto(somax,somay);
    }



find_intersection(outcode: string, p1: Ponto, p2: Ponto, janela: Janela)
{

    let x1 = p1.x;
    let x2 = p2.x;
    let y1 = p1.y;
    let y2 = p2.y;

    let intersections_list = []

    let m = (y2 - y1) / (x2 - x1);
    let pEsquerda = new Ponto(janela.xMin, m * (janela.xMin - x1) + y1);
    let pDireita = new Ponto(janela.xMax, m * (janela.xMax - x1) + y1);
    let pTopo = new Ponto(x1 + (1 / m) * (janela.yMax - y1), janela.yMax);
    let pFundo = new Ponto(x1 + (1 / m) * (janela.yMin - y1), janela.yMin);

    if (pEsquerda.y >= janela.yMin && pEsquerda.y <= janela.yMax)
        intersections_list.push(pEsquerda);
    if (pDireita.y >= janela.yMin && pDireita.y <= janela.yMax)
        intersections_list.push(pDireita)
    if (pTopo.x > janela.xMin && pTopo.x <= janela.xMax)
        intersections_list.push(pTopo);
    if (pFundo.x > janela.xMin && pFundo.x <= janela.xMax)
        intersections_list.push(pFundo);
    return intersections_list
}
cliping(areaCliping: Janela): Poligono{
    let pol = new Poligono()
    pol.tipo = TIPO_POLIGONO.cliping;
    for (let i = 0; i < this.pontos.length - 1; i++) {
        //New variables to hold end points. No relation 
        //to global 'start' and 'end'
        let start_ = this.pontos[i];
        let end_ = this.pontos[i + 1];

        let o1 = start_.cohen(areaCliping);
        let o2 = end_.cohen(areaCliping);
        console.log('o1 o2 and', o1, o2, (parseInt(o1) & parseInt(o2)))
        //Ambos os códigos de saída são 0. Isso significa que ambos os pontos finais estão dentro da janela de visualização
        if (o1 == '0000' && o2 == '0000') {
            console.log('accept');
            pol.pontos.push(start_)
            pol.pontos.push(end_)
        }
        //ambos os códigos de saída têm o mesmo conjunto de bits quando ambos os pontos finais estão fora da janela de visualização
        // Um ​​ponto final dentro da janela de visualização e uma janela externa
        else if ((parseInt(o1) & parseInt(o2)) == 0) {
            pol.pontos = this.find_intersection(o1, this.pontos[i], this.pontos[i + 1], areaCliping);
        }



    }
    return pol;
}

xWvp(mundo: Janela, viewPort: Janela, x: number){
    return ((x - mundo.xMin) / (mundo.xMax - mundo.xMin))
        * (viewPort.xMax - viewPort.xMin);
}

yWvp(mundo: Janela, viewPort: Janela, y: number){
    return (1 - ((y - mundo.yMin) / (mundo.yMax - mundo.yMin))) * (viewPort.yMax - viewPort.yMin);
}
}