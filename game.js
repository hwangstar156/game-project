'use strict'
import popUp from './popup.js';
import * as sound from './background.js';
export default class game{
    constructor(bulletCount,mobCount,limitTime){
        this.bulletCount=bulletCount;
        this.mobCount=mobCount;
        this.timer=undefined;
        this.started=false;
        this.limitTime=limitTime;
        this.popUp=new popUp();
        document.addEventListener('click',this.onClick);
        this.field=document.querySelector('.game');
        this.minuteTime=document.querySelector('#minute');
        this.secondTime=document.querySelector('#second');
        this.bullet=document.querySelector('.bullet_count');
    }

    onClick = (event)=>{
        if(event.target==this.popUp.currentSpace()){
            if(this.started){
                return;
            }
            this.started=true;
            setTimeout(()=>{
                this.initGame();
            },1000);
        }else{
            if(!this.started){
                return;
            }
            const point=event.target;
            this.handlerBullet(--this.bulletCount);
            this.shotWhere(point);
            sound.playShotsound();
        }
    }

    initGame(){
        sound.playBackground();
        this.popUp.popUpToggle();
        this.updateBulletText(this.bulletCount);
        this.startTimer();
        const x1=window.innerWidth-90;
        const y1=window.innerHeight-190;
        const imgPath='./img/move/move.0.png';
        for(let i=0;i<this.mobCount;i++){
            const item=document.createElement('div');
            item.setAttribute('class','mob');
            item.style.backgroundImage=`url(${imgPath})`;
            item.style.backgroundRepeat='no-repeat';
            item.style.position='absolute';
            const x=this.randomNumber(0,x1);
            const y=this.randomNumber(100,y1);
            item.style.left=`${x}px`;
            item.style.top=`${y}px`;
            this.setItemClass(item, x<window.innerWidth/2 ? 'left':'right');
            this.field.appendChild(item);
        }
    }
    
    setItemClass(item,direction){
        item.classList.add(direction);
    }

    randomNumber(min,max){
        return Math.random()*(max-min)+min;
    }

    handlerBullet(bullet){
        if(bullet>=0){
            this.updateBulletText(bullet);
        }else{
            if(this.mobCount==0){
                this.endGame('CLEAR');
            }else{
                this.endGame('Fail');
            }
        }
    }

    
    updateBulletText(bulletCount){
        this.bullet.innerText=`${bulletCount}`;
    }

    shotWhere(point){
        if(point.className=='mob left' || point.className=='mob right'){
            this.killMob(point);
        }
    }

    killMob(point){
        this.mobCount--;
        sound.playDiedSound()
        point.classList.add('died');
        setTimeout(()=>{
            point.remove();
        },700);
        if(this.mobCount==0){
            this.endGame('CLEAR');
        }
    }
    
    stopTimer(){
        clearInterval(this.timer);
    }

    updateTimeText(sec){
        const minutes=Math.floor(sec/60).toString();
        const seconds=(sec%60).toString().padStart('2',0);
        this.minuteTime.innerText=`${minutes}`;
        this.secondTime.innerText=`${seconds}`;
    }

    startTimer=()=>{
        let remainingTime=this.limitTime;
        this.updateTimeText(remainingTime)
        this.timer=setInterval(()=>{
            if(remainingTime<=0){
                this.stopTimer();
                this.endGame('Time Over');
                return;
            }
            this.updateTimeText(--remainingTime);
        },1000)
    }


    endGame(message){
        this.field.innerHTML=""
        this.stopTimer();
        sound.stopBackground();
        this.popUp.currentSpace().innerText=`${message}`;
        this.popUp.popUpToggle();
    }
}
