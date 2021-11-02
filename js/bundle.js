/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calculator.js":
/*!**********************************!*\
  !*** ./js/modules/calculator.js ***!
  \**********************************/
/***/ ((module) => {

function calculator() {
    /////////////////////CALCULATOR////////////////////////////////

    const result = document.querySelector('.calculating__result span');
    let sex, height, weight, age, ratio;

    function initLocalSettings(selector, activeClass) {
        let elements = document.querySelectorAll(selector);

        elements.forEach(element => {
            element.classList.remove(activeClass);
            if (element.getAttribute('id') == localStorage.getItem('sex')) {
                element.classList.add(activeClass);
                console.log(element.getAttribute('id'));
            }
            if (element.getAttribute('data-ratio') == localStorage.getItem('ratio')) {
                element.classList.add(activeClass);
                console.log(element.getAttribute('data-ratio'));
            }

        });
    }

    initLocalSettings('#gender div', 'calculating__choose-item_active');
    initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');


    if (localStorage.getItem('sex')) {
        sex = localStorage.getItem('sex');
    } else {
        sex = 'female';
        localStorage.setItem('sex', 'female');
    }

    if (localStorage.getItem('ratio')) {
        ratio = localStorage.getItem('ratio');
    } else {
        ratio = 1.375;
        localStorage.setItem('ratio', 1.375);
    }

    function calcTotal() {
        if (!sex || !height || !weight || !age || !ratio) {
            result.textContent = '_____';
            return;
        }
        if (sex === 'female') {
            result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
        } else {
            result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
        }
    }

    function getStaticInformation(selector, activeClass) {
        const elements = document.querySelectorAll(selector);

        elements.forEach(element => {
            element.addEventListener('click', (e) => {
                if (e.target.getAttribute('data-ratio')) {
                    ratio = +e.target.getAttribute('data-ratio');
                    localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'));
                } else {
                    sex = e.target.getAttribute('id');
                    localStorage.setItem('sex', e.target.getAttribute('id'));
                }

                elements.forEach(element => {
                    element.classList.remove(activeClass);
                });
                e.target.classList.add(activeClass);
                calcTotal();
            });
        });

    }
    getStaticInformation('#gender div', 'calculating__choose-item_active');
    getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active');
    calcTotal();

    function getDinamicInformation(selector) {
        const input = document.querySelector(selector);

        input.addEventListener('input', () => {

            if (input.value.match(/\D/g)) {
                input.style.border = '1px solid red';
            } else {
                input.style.border = 'none';
            }
            switch (input.getAttribute('id')) {
                case 'height':
                    height = +input.value;
                    break;
                case 'weight':
                    weight = +input.value;
                    break;
                case 'age':
                    age = +input.value;
                    break;
            }
            calcTotal();
        });
    }
    getDinamicInformation('#height');
    getDinamicInformation('#weight');
    getDinamicInformation('#age');
}

module.exports = calculator;

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((module) => {

function cards() {
    ////////////CLASSES FOR MENU_ITEMS////////////////
    class MenuItem {
        constructor(img, imgDescr, subtitle, descr, price, parentSelector, ...classes) {
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

        changeToUAH() {
            this.price = +this.price * this.transfer;
        }

        renderMenuItem() {
            const menuItem = document.createElement('div');
            if (this.classes.length === 0) {
                this.classes = 'menu__item';
                menuItem.classList.add(this.classes);
            } else {
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

    const getResourse = async (url) => {
        const res = await fetch(url);
        if (!res.ok) {
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
        .then(obj => {
            obj.data.forEach(({
                img,
                altimg,
                title,
                descr,
                price
            }) => {
                new MenuItem(img, altimg, title, descr, price, '.menu .container').renderMenuItem();
            });
        });
}

module.exports = cards;

/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ ((module) => {

function forms() {

    /////////POST FORMS DATA//////
    const forms = document.querySelectorAll('form');

    const message = {
        loading: 'img/form/spinner.svg',
        sucsess: 'Спасибо, скоро мы с Вами свяжемся',
        failure: 'Что-то пошло не так'
    };

    forms.forEach(form => {
        bindPostData(form);
    });

    const postData = async (url, data) => {
        const res = await fetch(url, {
            method: 'POST',
            body: data,
            headers: {
                'Content-type': 'application/json'
            }
        });
        return await res.json();
    };

    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
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


            postData('http://localhost:3000/requests', json)
                .then((data) => {
                    console.log(data);
                    showThanksModal(message.sucsess);
                    statusMessage.remove();
                }).catch((data) => {
                    showThanksModal(message.failure);
                }).finally(() => {
                    form.reset();
                });
        });
    }

    function showThanksModal(message) {
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

        setTimeout(() => {
            thanksModal.remove();
            prevModalDilog.classList.add('show');
            prevModalDilog.classList.remove('hide');
            hideModal();
        }, 4000);
    }

    // fetch('http://localhost:3000/menu').then(data=>data.json())
    // .then(data=> console.log(data));
}

module.exports = forms;

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((module) => {

function modal() {
    ///////////////////////MODAL/////////

    const modal = document.querySelector('.modal'),
        modalBtns = document.querySelectorAll('[data-modal]');

    function showModal() {
        modal.classList.add('show');
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden';
        clearInterval(timeoutId);
    }

    modalBtns.forEach(item => {
        item.addEventListener('click', showModal);
    });

    let timeoutId = setTimeout(showModal, 50000);


    function hideModal() {
        modal.classList.remove('show');
        modal.classList.add('hide');
        document.body.style.overflow = '';
    }

    modal.addEventListener('click', (e) => {
        if (e.target == modal || e.target.getAttribute('data-close') == "") {
            hideModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && modal.classList.contains('show')) {
            hideModal();
        }
    });

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >=
            document.documentElement.scrollHeight) {
            showModal();
            window.removeEventListener('scroll', showModalByScroll);
        }
    }
    window.addEventListener('scroll', showModalByScroll);



}

module.exports = modal;

/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((module) => {

function slider() {
    //////////////////////SLIDER//////////////////////////////////

    const slider = document.querySelector('.offer__slider'),
        slides = document.querySelectorAll('.offer__slide'),
        prev = document.querySelector('.offer__slider-prev'),
        next = document.querySelector('.offer__slider-next'),
        slidesWrapper = document.querySelector('.offer__slider-wrapper'),
        slidesField = document.querySelector('.offer__slider-inner'),
        width = window.getComputedStyle(slidesWrapper).width;

    let slideIndex = 1,
        total = document.querySelector('#total'),
        current = document.querySelector('#current');

    function renderSlidesCounter() {
        if (slides.length < 10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }
    }

    function moveSlides() {
        slidesField.style.transform = `translateX(-${offset}px)`;
    }

    function replaceToNum(str) {
        return +str.replace(/\D/g, '');
    }

    slidesField.style.width = 100 * slides.length + '%';
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';
    slidesWrapper.style.overflow = 'hidden';
    slides.forEach(item => {
        item.style.width = width;
    });

    let offset = 0;

    if (slides.length < 10) {
        total.textContent = `0${slides.length}`;
    } else {
        total.textContent = slides.length;
    }
    renderSlidesCounter();

    //////////////////////////////////////DOTS NAVIGATION///////////////////////////
    slider.style.position = 'relative';
    const dots = document.createElement('ol'),
        dotsArray = [];
    dots.classList.add('carousel-indicators');
    slider.append(dots);

    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);
        dot.classList.add('dot');

        if (i == 0) {
            dot.style.opacity = 1;
        }
        dotsArray.push(dot);
        dots.append(dot);

    }

    next.addEventListener('click', () => {
        if (offset == replaceToNum(width) * (slides.length - 1)) {
            offset = 0;
        } else {
            offset += replaceToNum(width);
        }
        moveSlides();
        if (slideIndex == slides.length) {
            slideIndex = 1;
        } else {
            slideIndex++;
        }
        renderSlidesCounter();
        dotsArray.forEach(dot => dot.style.opacity = '0.5');
        dotsArray[slideIndex - 1].style.opacity = '1';
    });

    prev.addEventListener('click', () => {
        if (offset == 0) {
            offset = replaceToNum(width) * (slides.length - 1);
        } else {
            offset -= replaceToNum(width);
        }
        moveSlides();
        if (slideIndex == 1) {
            slideIndex = slides.length;
        } else {
            slideIndex--;
        }
        renderSlidesCounter();
        dotsArray.forEach(dot => dot.style.opacity = '0.5');
        dotsArray[slideIndex - 1].style.opacity = '1';
    });

    dotsArray.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');
            slideIndex = slideTo;
            dotsArray.forEach(dot => dot.style.opacity = '0.5');
            dotsArray[slideIndex - 1].style.opacity = '1';
            offset = replaceToNum(width) * (slideTo - 1);
            moveSlides();
            renderSlidesCounter();
        });
    });

    ////////////////////////////////////////SIMPLE SLIDER///////////////////////////////
    // showSlides(slideIndex);

    // if(slides.length < 10){
    //     total.textContent = `0${slides.length}`;
    // } else{
    //     total.textContent = slides.length;
    // }

    // function showSlides(n){
    //     if(n>slides.length){
    //         slideIndex = 1;
    //     }
    //     if(n<1){
    //         slideIndex = slides.length;
    //     }
    //     slides.forEach(item=>{
    //         item.classList.add('hide');                
    //     });
    //     slides[slideIndex-1].classList.remove('hide');

    //     if(slides.length < 10){
    //         current.textContent = `0${slideIndex}`;
    //     } else{
    //         current.textContent = slideIndex;
    //     }
    // }

    // function plusSlides(n){
    //     showSlides(slideIndex += n);
    // }

    // prev.addEventListener('click', ()=>plusSlides(-1));
    // next.addEventListener('click', ()=>plusSlides(1));     

}

module.exports = slider;

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((module) => {

function tabs() {
    const tabs = document.querySelectorAll('.tabheader__item'),
        tabsContent = document.querySelectorAll('.tabcontent'),
        tabsParrent = document.querySelector('.tabheader__items');

    function hideTabContent() {
        tabsContent.forEach(item => {
            item.classList.remove('show');
            item.classList.add('hide');
        });

        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
    }

    function showTabContent(i = 0) {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');

    }

    hideTabContent();
    showTabContent();

    tabsParrent.addEventListener('click', (e) => {
        const target = e.target;

        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });
}

module.exports = tabs;

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((module) => {

function timer() {
    ///////////////////////////TIMER///////////////////////////////////

    const deadline = '2021-11-16';

    function getTimeRemaining(endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date()),
            days = Math.floor((t / (1000 * 60 * 60 * 24))),
            seconds = Math.floor((t / 1000) % 60),
            minutes = Math.floor((t / 1000 / 60) % 60),
            hours = Math.floor((t / (1000 * 60 * 60) % 24));

        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function getZero(num) {
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
            } else {
                days.innerHTML = getZero(t.days);
                hours.innerHTML = getZero(t.hours);
                minutes.innerHTML = getZero(t.minutes);
                seconds.innerHTML = getZero(t.seconds);
            }

        }
    }

    setClock('.timer', deadline);

}

module.exports = timer;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/


document.addEventListener('DOMContentLoaded', () => {
    const tabs = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js"),
          timer = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js"),
          slider = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js"),
          modal = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js"),
          forms = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js"),
          cards = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js"),
          calculator = __webpack_require__(/*! ./modules/calculator */ "./js/modules/calculator.js");

          tabs();
          timer();
          slider();
          modal();
          forms();
          cards();
          calculator();
});
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map