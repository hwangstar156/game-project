'use strict';

const backGroundList=[
    './img/bg.jfif',
    './img/bg2.jfif',
    './img/background.jfif',
    './img/엘리니아.jpg',
    './img/bg3.jfif'
]

const soundList=[
    './sound/MapleLeaf.mp3',
    './sound/TheTuneOfAzureLight.mp3',
    './sound/LachelntheIllusionCity.mp3',
    './sound/WhenTheMorningComes.mp3',
    './sound/ChewChew MainTheme.mp3'
]


const game=document.querySelector('.game');
const randNum=Math.floor(Math.random()*backGroundList.length);
const backgroundMusic= new Audio(soundList[randNum]);
const shotSound=new Audio('./sound/shotgun1+가까이+단발.wav');
const diedSound=new Audio('./sound/mobdied.wav');

export function playBackground(){
    playSound(backgroundMusic);
}

export function stopBackground(){
    stopSound(backgroundMusic);
}

export function playShotsound(){
    playSound(shotSound);
}

export function playDiedSound(){
    playSound(diedSound);
}


function stopSound(sound){
    sound.pause();
}


function playSound(sound){
    sound.volume=0.6;
    sound.currentTime=0;
    sound.play();
}

game.style.backgroundImage=`url(${backGroundList[randNum]})`;
game.style.backgroundRepeat='no-repeat';
game.style.backgroundPosition='center';