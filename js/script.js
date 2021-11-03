"use strict";
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

    tabs();
    timer();
    slider();
    modal('[data-modal]', '.modal', modalTimerId);
    forms(modalTimerId);
    cards();
    calculator();
});