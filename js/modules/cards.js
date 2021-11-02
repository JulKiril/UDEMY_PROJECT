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