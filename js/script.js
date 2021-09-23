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
      modalBtns = document.querySelectorAll('[data-modal]');

      function showModal(){
        modal.classList.add('show');
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden';
        clearInterval(timeoutId);
      }
      
      modalBtns.forEach(item=>{
        item.addEventListener('click',showModal);
      });

      let timeoutId = setTimeout(showModal,50000);
      

      function hideModal(){
        modal.classList.remove('show');
        modal.classList.add('hide');
        document.body.style.overflow = '';
      }

      modal.addEventListener('click', (e)=>{
        if(e.target == modal || e.target.getAttribute('data-close') == ""){
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

      const getResourse = async (url)=>{
        const res = await fetch(url);
            if(!res.ok){
                throw new Error(`Could not fetch ${url}, status: ${res.status}`);
            }
        return await res.json();        
    };

        // getResourse('http://localhost:3000/menu')
        // .then((data)=>{
            // data.forEach(({img,altimg,title,descr,price}) => {
            //     new MenuItem(img,altimg,title,descr,price,'.menu .container').renderMenuItem();
            // });
        // });

        axios.get('http://localhost:3000/menu')
            .then(obj=>{
                obj.data.forEach(({img,altimg,title,descr,price}) => {
                    new MenuItem(img,altimg,title,descr,price,'.menu .container').renderMenuItem();
                }); 
            });

        /////////POST FORMS DATA//////
        const forms = document.querySelectorAll('form');

        const message = {
            loading: 'img/form/spinner.svg',
            sucsess: 'Спасибо, скоро мы с Вами свяжемся',
            failure: 'Что-то пошло не так'
        };

        forms.forEach(form =>{
            bindPostData(form);
        });

        const postData = async (url, data)=>{
            const res = await fetch(url, {
                method: 'POST',
                    body: data,
                    headers:{ 
                        'Content-type' : 'application/json'}
            });
            return await res.json();
        };

        function bindPostData(form){
            form.addEventListener('submit',(e)=>{
                e.preventDefault();

                let statusMessage = document.createElement('img');
                statusMessage.src = message.loading;
                statusMessage.style.cssText = `
                    display: block;
                    margin: 0 auto;
                `;
                form.insertAdjacentElement('afterend', statusMessage);


                const formData = new FormData(form);
                // const obj = {};
                // formData.forEach((value,key) =>{
                //     obj[key] = value;
                // });    
                
                const json = JSON.stringify(Object.fromEntries(formData.entries()));
             

                postData('http://localhost:3000/requests',json)
                .then((data)=>{
                    console.log(data);
                    showThanksModal(message.sucsess);
                    statusMessage.remove();
                }).catch((data)=>{
                    showThanksModal(message.failure);
                }).finally(()=>{
                    form.reset();
                });
            });
        }

        function showThanksModal(message){
            const prevModalDilog = document.querySelector('.modal__dialog');
            prevModalDilog.classList.add('hide');

            showModal();
            const thanksModal = document.createElement('div');
            thanksModal.classList.add('modal__dialog');
            thanksModal.innerHTML = `
            <div class="modal__content"> 
                <div data-close class="modal__close">&times;</div>        
                <div class="modal__title">${message}</div>               
            </div>
            `;
            document.querySelector('.modal').append(thanksModal);

            setTimeout(()=>{
                thanksModal.remove();
                prevModalDilog.classList.add('show');
                prevModalDilog.classList.remove('hide');
                hideModal();
            },4000);
        }

        // fetch('http://localhost:3000/menu').then(data=>data.json())
        // .then(data=> console.log(data));

        //////////////////////SLIDER//////////////////////////////////

        const slides = document.querySelectorAll('.offer__slide'),
              prev = document.querySelector('.offer__slider-prev'),
              next = document.querySelector('.offer__slider-next');
        let  slideIndex = 1,
             total = document.querySelector('#total'),
             current = document.querySelector('#current');

        showSlides(slideIndex);

        // current.textContent = `0${slideIndex}`;
        if(slides.length < 10){
            total.textContent = `0${slides.length}`;
        } else{
            total.textContent = slides.length;
        }

        function showSlides(n){
            if(n>slides.length){
                slideIndex = 1;
            }
            if(n<1){
                slideIndex = slides.length;
            }
            slides.forEach(item=>{
                item.classList.add('hide');                
            });
            slides[slideIndex-1].classList.remove('hide');

            if(slides.length < 10){
                current.textContent = `0${slideIndex}`;
            } else{
                current.textContent = slideIndex;
            }
        }

        function plusSlides(n){
            showSlides(slideIndex += n);
        }

        prev.addEventListener('click', ()=>plusSlides(-1));
        next.addEventListener('click', ()=>plusSlides(1));

    });