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

      ////////////CLASSES FOR MENU_ITEMS////////////////

 

      class MenuItem {
          constructor(img, imgDescr, subtitle,descr,price,parentSelector,...classes){
              this.img = img;
              this.imgDescr = imgDescr;
              this.subtitle = subtitle;
              this.desr = descr;
              this.price = price;
              this.transfer = 27;
              this.parent = document.querySelector(parentSelector);
              this.classes = classes;
              this.changeToUAH();
          }

          changeToUAH(){
              this.price = +this.price * this.transfer;
          }

          renderMenuItem(){              
              const menuItem = document.createElement('div');
              if(this.classes.length === 0){
                  this.classes = 'menu__item';
                  menuItem.classList.add(this.classes);
              }
              else{
                  this.classes.forEach(className => menuItem.classList.add(className));
              }
              
              menuItem.innerHTML = `<img src=${this.img} alt="${this.imgDescr}">
              <h3 class="menu__item-subtitle">Меню "${this.subtitle}"</h3>
              <div class="menu__item-descr">${this.desr}</div>
              <div class="menu__item-divider"></div>
              <div class="menu__item-price">
                  <div class="menu__item-cost">Цена:</div>
                  <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
              </div>`;
                this.parent.append(menuItem);
          }
      }

      new MenuItem(
          'img/tabs/vegy.jpg', 
          'vegy', 
          'Меню "Фитнес"',
          'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!', 
          9, 
          '.menu .container',
          'menu__item').renderMenuItem();
       

      new MenuItem(
          'img/tabs/elite.jpg',
          'elite','Меню “Премиум”',
          'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
          '10',
          '.menu .container',
          'menu__item').renderMenuItem();

      new MenuItem(
          'img/tabs/post.jpg',
           'post', 'Меню "Постное"',
           'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.', 
           '11', 
           '.menu .container',
           'menu__item').renderMenuItem();
    });