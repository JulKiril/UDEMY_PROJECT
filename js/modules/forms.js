import {showModal, hideModal} from './modal';
import{postData} from '../services/services';

function forms(formSelector, timeoutId) {

    /////////POST FORMS DATA//////
    const forms = document.querySelectorAll(formSelector);

    const message = {
        loading: 'img/form/spinner.svg',
        sucsess: 'Спасибо, скоро мы с Вами свяжемся',
        failure: 'Что-то пошло не так'
    };

    forms.forEach(form => {
        bindPostData(form);
    });



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

        showModal('.modal', timeoutId);
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
            hideModal('.modal');
        }, 4000);
    }

    // fetch('http://localhost:3000/menu').then(data=>data.json())
    // .then(data=> console.log(data));
}

export default forms;