const gameTimer=document.querySelector('.timer_time');
const minuteTime=document.querySelector('#minute');
const secondTime=document.querySelector('#second');
const target=document.querySelector('.target');
const bullet=document.querySelector('.bullet_count');
const limitTime=30;
let timer;
let bulletCount=80;

document.addEventListener('mousemove',handlerTarget);
document.addEventListener('click',handlerClick);


function handlerClick(event){
    const point=event.target.className;
    // cursorEffect();
    shotWhere(point);
}

function shotWhere(point){
    if(point=='mob'){
        killMob();
    }
    updateBulletText(--bulletCount);
}

function killMob(){

}

function handlerTarget(event){
    const x=event.clientX-40;
    const y=event.clientY-50;
    target.style.transform=`translate(${x}px,${y}px)`;
}

function startTimer(){
    let remainingTime=limitTime;
    updateTimeText(remainingTime)
    timer=setInterval(function(){
        if(remainingTime<=0){
            stopTimer();
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

function updateBulletText(bulletCount){
    bullet.innerText=`${bulletCount}`;
}



