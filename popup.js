'use strict';

export default class popUp{
    constructor(){
        this.popUp = document.querySelector('.pop_up');
    }

    currentSpace(){
        return this.popUp;
    }

    popUpToggle=()=>{
        if(this.popUp.style.display=='none'){
            this.popUp.style.display='block';
        }else{
            this.popUp.style.display='none';
        }
    }

}
