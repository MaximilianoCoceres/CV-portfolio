const item      = document.querySelectorAll('.item')   
const principal = document.querySelectorAll('.principal')
const titulo     = document.querySelectorAll('.titulo')   
const parrafo = document.querySelectorAll('.parrafo-about')
const sliderContainer = document.getElementById('slider-container');
const slider = document.getElementById('slider');
const buttonLeft = document.getElementById('button-left');
const buttonRight = document.getElementById('button-right');
const rootStyle = document.documentElement.style;

const sliderElements = document.querySelectorAll('.slider__element');
let sliderCounter = 0;
let isInTransition = false;

const DIRECTION ={
    RIGHT:'RIGHT',
    LEFT:'LEFT'
};


item.forEach((cadaItem, i) =>{
    item[i].addEventListener('click',()=>{
        item.forEach((cadaItem,j)=>{
        
            item[j].classList.remove('activo');
            principal[j].classList.remove('activo');
            titulo[i].classList.remove('activo');
        parrafo[i].classList.remove('activo');
        })
        
        item[i].classList.add('activo');
        principal[i].classList.add('activo');
    });
});




titulo.forEach((cadaTitulo, i) =>{
    titulo[i].addEventListener('click',()=>{
        // item.forEach((cadaTitulo,j)=>{
        
        //     // titulo[j].classList.remove('activo');
        //     // parrafo[j].classList.remove('activo');
        // })
        
        titulo[i].classList.toggle('activo');
        parrafo[i].classList.toggle('activo');
    });


});

const getTransformValue = ()=>
Number(rootStyle.getPropertyValue('--slider-transform').replace('px',''));

const reorderSlide = ()=>{
    const transformValue = getTransformValue();
    rootStyle.setProperty('--transition','none');
    if(sliderCounter===sliderElements.length -1){   
        slider.appendChild(slider.firstElementChild);
        rootStyle.setProperty('--slider-transform', `${transformValue + sliderElements[sliderCounter].scrollWidth}px`);
        sliderCounter--;
    }else if(sliderCounter===0) {
        slider.prepend(slider.lastElementChild);
        rootStyle.setProperty('--slider-transform', `${transformValue - sliderElements[sliderCounter].scrollWidth}px`);
        sliderCounter++;
    }

    isInTransition = false;
}

const moveSlide=(direction)=>{
    if(isInTransition)return;
    const transformValue = getTransformValue();
    rootStyle.setProperty('--transition','transform 1s');
    isInTransition = true;
    if (direction===DIRECTION.LEFT){
        rootStyle.setProperty('--slider-transform', `${transformValue + sliderElements[sliderCounter].scrollWidth}px`);
        sliderCounter--;
    }else if(direction===DIRECTION.RIGHT){
        rootStyle.setProperty('--slider-transform', `${transformValue - sliderElements[sliderCounter].scrollWidth}px`);
        sliderCounter++;
    }
}


buttonRight.addEventListener('click',()=>moveSlide(DIRECTION.RIGHT));
buttonLeft.addEventListener('click',()=>moveSlide(DIRECTION.LEFT));

slider.addEventListener('transitionend', reorderSlide);

reorderSlide();