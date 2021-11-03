function showModal(modalSelector,timeoutId) {
    const modal = document.querySelector(modalSelector);
    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden';
    console.log(timeoutId);

    if(timeoutId){
        clearInterval(timeoutId);
    }
    
}

function hideModal(modalSelector) {
    const modal = document.querySelector(modalSelector);
    modal.classList.remove('show');
    modal.classList.add('hide');
    document.body.style.overflow = '';
}

function modal(triggerSelector, modalSelector, timeoutId) {
    ///////////////////////MODAL/////////

    const modal = document.querySelector(modalSelector),
          modalBtns = document.querySelectorAll(triggerSelector);

    modalBtns.forEach(item => {
        item.addEventListener('click', ()=>showModal(modalSelector, timeoutId));
    });

    modal.addEventListener('click', (e) => {
        if (e.target == modal || e.target.getAttribute('data-close') == "") {
            hideModal(modalSelector);
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && modal.classList.contains('show')) {
            hideModal(modalSelector);
        }
    });

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >=
            document.documentElement.scrollHeight) {
            showModal(modalSelector, timeoutId);
            window.removeEventListener('scroll', showModalByScroll);
        }
    }
    window.addEventListener('scroll', showModalByScroll);
}

export default modal;
export {showModal};
export {hideModal};