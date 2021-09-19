"use strict";

document.addEventListener('DOMContentLoaded', ()=>{
    const tabs = document.querySelectorAll('.tabheader__item'),
          tabsContent = document.querySelectorAll('.tabcontent'),
          tabsParrent = document.querySelector('.tabheader__items');

function hideTabContent(){
    tabsContent.forEach(item =>{
        item.classList.remove('show');
        item.classList.add('hide');
    });

    tabs.forEach(item =>{
        item.classList.remove('tabheader__item_active');
    });
}

function showTabContent(i = 0){
    tabsContent[i].classList.add('show','fade');
    tabsContent[i].classList.remove('hide');
    tabs[i].classList.add('tabheader__item_active');

}

hideTabContent();
showTabContent();

tabsParrent.addEventListener('click', (e)=>{
    const target = e.target;

    if(target && target.classList.contains('tabheader__item')){
        tabs.forEach((item,i)=>{
            if(target == item){
                hideTabContent();
                showTabContent(i);
            }
        });
    }
});

///////////////////////////TIMER///////////////////////////////////

const deadline = '2021-11-16';

function getTimeRemaining(endtime) {
    const t = Date.parse(endtime) - Date.parse(new Date()),
        days = Math.floor( (t/(1000*60*60*24)) ),
        seconds = Math.floor( (t/1000) % 60 ),
        minutes = Math.floor( (t/1000/60) % 60 ),
        hours = Math.floor( (t/(1000*60*60) % 24) );

    return {
        'total': t,
        'days': days,
        'hours': hours,
        'minutes': minutes,
        'seconds': seconds
    };
}

function getZero(num){
    if (num >= 0 && num < 10) { 
        return '0' + num;
    } else {
        return num;
    }
}


function setClock(selector, endtime) {

    const timer = document.querySelector(selector),
        days = timer.querySelector("#days"),
        hours = timer.querySelector('#hours'),
        minutes = timer.querySelector('#minutes'),
        seconds = timer.querySelector('#seconds'),
        timeInterval = setInterval(updateClock, 1000);

    updateClock();

    function updateClock() {
        const t = getTimeRemaining(endtime);

        if (t.total <= 0) {
            clearInterval(timeInterval);
        }
        else{
            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);
        }

    }
}

setClock('.timer', deadline);


///////////////////////MODAL/////////

const modal = document.querySelector('.modal'),
      modalBtns = document.querySelectorAll('[data-modal]'),
      modalCloseBtn = document.querySelector('[data-close]');

      function showModal(){
        modal.classList.add('show');
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden';
        clearInterval(timeoutId);
      }
      
      modalBtns.forEach(item=>{
        item.addEventListener('click',showModal);
      });

      let timeoutId = setTimeout(showModal,10000);
      

      function hideModal(){
        modal.classList.remove('show');
        modal.classList.add('hide');
        document.body.style.overflow = '';
      }

      modalCloseBtn.addEventListener('click', hideModal);

      modal.addEventListener('click', (e)=>{
        if(e.target == modal){
            hideModal();
        }
      });

      document.addEventListener('keydown',(e)=>{
            if(e.code === 'Escape' && modal.classList.contains('show')){
                hideModal();
            }
      });

      function showModalByScroll(){
        if(window.pageYOffset + document.documentElement.clientHeight >= 
            document.documentElement.scrollHeight){
                showModal();
                window.removeEventListener('scroll', showModalByScroll);
            }
      }
      window.addEventListener('scroll', showModalByScroll);
});