"use strict";
import 'nodelist-foreach-polyfill';
import tabs from './modules/tabs';
import timer from './modules/timer';
import slider from './modules/slider';
import modal from './modules/modal';
import forms from './modules/forms';
import cards from './modules/cards';
import calculator from './modules/calculator';
import {showModal} from './modules/modal';

document.addEventListener('DOMContentLoaded', () => {

    let modalTimerId = setTimeout(()=>showModal('.modal', modalTimerId), 1000);

    tabs('.tabheader__item','.tabcontent','.tabheader__items','tabheader__item_active');
    timer('.timer','2021-11-16');
    slider({
        totalCounter: '#total',
        currentCounter: '#current',
        container: '.offer__slider',
        slide: '.offer__slide',
        prevArrow: '.offer__slider-prev',
        nextArrow: '.offer__slider-next',
        wrapper:'.offer__slider-wrapper',
        viewField: '.offer__slider-inner'

    });
    modal('[data-modal]', '.modal', modalTimerId);
    forms('form',modalTimerId);
    cards();
    calculator();
});