'use strict';

const game=document.querySelector('.game');

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
const randNum=Math.floor(Math.random()*backGroundList.length);
const backgroundMusic= new Audio(soundList[randNum]);
export function playSound(){
    backgroundMusic.currentTime=0;
    backgroundMusic.volume=0.6;
    backgroundMusic.play();
}

export function stopSound(){
    backgroundMusic.pause();
}

game.style.backgroundImage=`url(${backGroundList[randNum]})`;
game.style.backgroundRepeat='no-repeat';
game.style.backgroundPosition='center';