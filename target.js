'use strict';

let colorType=undefined;
let tool=undefined;
export default class target{
    constructor(){
        this.target=document.querySelector('.target');
        document.addEventListener('mousemove',(event)=>this.onMove(event));
        document.addEventListener('click',(event)=>this.onMove(event));
    }

    setItemListener(onMove){
        this.onMove=onMove
    }
    
    onMove(event){
        if(event.type=='mousemove'){
            colorType='white';
            tool="";
        }else{
            colorType='tomato';
            tool="scale(1.4)";
        }
        const x=event.clientX-40;
        const y=event.clientY-50;
        this.target.style.transform=`translate(${x}px,${y}px) ${tool}`;
        this.target.style.color=colorType;
    }

}