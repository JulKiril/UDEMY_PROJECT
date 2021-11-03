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

export default slider;