export default class Tab {
    constructor(TabName) {
        this.config = {
            activeClass: 'isActive'
        };

        this.modelSelectors = {
            classTagItem: 'data-tag',
            classTabItem: 'data-target'
        };

        this.defaultOpenItemNumber = 0;

        this.initHeader(TabName);
    }

    initHeader(TabName) {
        if (!TabName) {
            return;
        }
        this.tagContainer = document.querySelector(TabName);

        if (this.tagContainer) {

            this.tagItems = this.tagContainer.querySelectorAll(`[${this.modelSelectors.classTagItem}]`);
            this.contentItems = document.querySelectorAll(`[${this.modelSelectors.classTabItem}]`);
            this.defaultOpenItem(this.defaultOpenItemNumber);

            this.tagItems.forEach((tagItem) => {

                tagItem.addEventListener('click', (e) => {

                    this.removeActiveClass();
                    this.contentItems.forEach((item) => {
                        if(tagItem.getAttribute(this.modelSelectors.classTagItem)==item.id) {
                            this.addActiveClass(item);
                            this.addActiveClass(tagItem);
                        }
                    }) 
                })

            });

        }




    }

    defaultOpenItem(number) {
        this.contentItems[number].classList.add(this.config.activeClass);
        this.tagItems[number].classList.add(this.config.activeClass);
        this.getId(this.contentItems[number]);
    }

    defaultCloseItem(number) {
        this.contentItems[number].classList.remove(this.config.activeClass);
        this.tagItems[number].classList.remove(this.config.activeClass);
    }


    addActiveClass(item) {
        item.classList.add(this.config.activeClass);
    }


    removeActiveClass() {
        this.tagItems.forEach((item) => {
            item.classList.remove(this.config.activeClass);
        });

        this.contentItems.forEach((item) => {
            item.classList.remove(this.config.activeClass);
        });
    }

    getId(item) {
        this.contentCurrentId = item.id.toLowerCase();
    }


}