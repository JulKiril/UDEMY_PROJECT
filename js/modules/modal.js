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