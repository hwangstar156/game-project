const gameTimer=document.querySelector('.timer_time');
const minuteTime=document.querySelector('#minute');
const secondTime=document.querySelector('#second');
const target=document.querySelector('.target');
const bullet=document.querySelector('.bullet_count');
const popUp=document.querySelector('.pop_up');
const field=document.querySelector('.game');
const shotSound=new Audio('./sound/shotgun1+가까이+단발.wav');
const limitTime=30;
let timer;
let bulletCount=30;
let mobCount=12;

document.addEventListener('mousemove',handlerTarget);
document.addEventListener('click',handlerClick);

updateBulletText(bulletCount);
popUpToggle();
setTimeout(()=>{
    initGame();
},1000);

function initGame(){
    popUpToggle();
    startTimer();
    const x1=window.innerWidth-90;
    const y1=window.innerHeight-190;
    const imgPath='./img/move/move.0.png';
    for(let i=0;i<mobCount;i++){
        const item=document.createElement('div');
        item.setAttribute('class','mob');
        item.style.backgroundImage=`url(${imgPath})`;
        item.style.backgroundRepeat='no-repeat';
        item.style.position='absolute';
        const x=randomNumber(0,x1);
        const y=randomNumber(100,y1);
        item.style.left=`${x}px`;
        item.style.top=`${y}px`;
        setItemId(item, x<window.innerWidth/2 ? 'left':'right');
        field.appendChild(item);
    }
}

function setItemClass(item,direction){
    item.setAttribute('class',direction);
}

function popUpToggle(){
    if(popUp.style.opacity=='1'){
        popUp.style.opacity='0'; 
    }else{
        popUp.style.opacity='1';
    }
}

function randomNumber(min,max){
    return Math.random()*(max-min)+min;
}

function handlerClick(event){
    const point=event.target;
    handlerBullet(--bulletCount);
    cursorEffect(event);
    shotWhere(point);
    soundShot();
}

function soundShot(){
    shotSound.currentTime=0;
    shotSound.volume=0.5;
    shotSound.play();
}

function shotWhere(point){
    console.log(point);
    if(point.className=='mob'){
        killMob(point);
    }
}

function cursorEffect(event){
    const x=event.clientX-40;
    const y=event.clientY-50;
    target.style.transform=`translate(${x}px,${y}px) scale(1.1)`;
    target.style.color='tomato';
}

function killMob(point){
    mobCount--;
    point.classList.add('died');
    setTimeout(()=>{
        point.remove();
    },700);
    if(mobCount==0){
        endGame('CLEAR');
    }
}

function endGame(message){
    stopTimer();
    popUp.innerText=`${message}`;
    popUp.style.display='block';
}

function handlerTarget(event){
    const x=event.clientX-40;
    const y=event.clientY-50;
    target.style.transform=`translate(${x}px,${y}px)`;
    target.style.color='white';
}

function startTimer(){
    let remainingTime=limitTime;
    updateTimeText(remainingTime)
    timer=setInterval(function(){
        if(remainingTime<=0){
            stopTimer();
            endGame('Time Over');
            return;
        }
        updateTimeText(--remainingTime);
    },1000)
}

function stopTimer(){
    clearInterval(timer);
}

function updateTimeText(sec){
    const minutes=Math.floor(sec/60).toString();
    const seconds=(sec%60).toString().padStart('2',0);
    minuteTime.innerText=`${minutes}`;
    secondTime.innerText=`${seconds}`;
}

function handlerBullet(bullet){
    if(bullet>=0){
        updateBulletText(bullet);
    }else{
        if(mobCount==0){
            endGame('CLEAR');
        }else{
            endGame('Fail');
        }
    }
}

function updateBulletText(bulletCount){
    bullet.innerText=`${bulletCount}`;
}



