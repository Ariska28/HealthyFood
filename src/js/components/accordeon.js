export default class Accordeon {
    constructor(AccordeonName) {
        this.config = {
            openClass: 'isOpen',
        }

        this.modelSelectors = {

        }

        this.AccordeonInit(AccordeonName);
    }

    AccordeonInit(AccordeonName) {

        this.accordeon = document.querySelector(AccordeonName);

        this.accordeon.addEventListener('click', (event) => {
            this.target = event.target;
            if (this.target.tagName == 'BUTTON') {
                this.target.classList.toggle(this.config.openClass);
                this.target.nextElementSibling.classList.toggle(this.config.openClass);
            }
        });
    }
}