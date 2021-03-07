export default Header;


class Header {
    constructor(headerName) {
        this.config = {
            scrollClass: 'isScroll',
            activeClass: 'isActive',
            openClass: 'isOpen',
        };

        this.modelSelectors = {
            navItem: 'data-nav-item',
            navBlock: 'data-navigation',
            burgerMenuClass: '.js-menu',
            navigationContainerClass: '.js-nav',
            closeBtnClass: '.js-btn',
        };

        this.activeAnchorId = "";

        this.headerContainer = "";
        this.links = [];
        this.blocks = [];

        this.anchors = [];

        this.initHeader(headerName);
    }

    initHeader(headerName) {
        if (!headerName) {
            return;
        }

        this.headerContainer = document.querySelector(headerName);
        this.links = document.querySelectorAll(`[${this.modelSelectors.navItem}]`);
        this.burgerMenu = document.querySelector(this.modelSelectors.burgerMenuClass);
        this.navigation = document.querySelector(this.modelSelectors.navigationContainerClass);
        this.closeBtns = document.querySelectorAll(this.modelSelectors.closeBtnClass);

 




        if (this.links.length) {

            this.links.forEach((anchorLink) => {
                if (
                    location.pathname.replace('/^/ /', '') == anchorLink.pathname.replace('/^/ /', '') &&
                    location.hostname == anchorLink.hostname &&
                    anchorLink.hash
                ) {
                    let blockId = anchorLink.hash;

                    let blockWithId = document.querySelector(blockId);
                    let blocksWithAttr = document.querySelectorAll(`[${this.modelSelectors.navBlock} = ${blockId.replace('#', '')}]:not(${blockId})`);

                    if (blockWithId || blocksWithAttr) {

                        this.anchors.push(anchorLink);

                        this.blocks.push(blockWithId);

                        blocksWithAttr.forEach((block) => {
                            this.blocks.push(block);
                        });

                    }
                }
            });
        }

        const callbackFunction = (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    console.log(entry.target);
                    let newActive;
                    if (entry.target.getAttribute(this.modelSelectors.navBlock)) {
                        newActive = `#${entry.target.getAttribute(this.modelSelectors.navBlock)}`;
                    } else {
                        newActive = `#${entry.target.id}`;
                    }
                    this.addActiveItem(newActive);
                }
            });
        };

        const observed = new IntersectionObserver(callbackFunction, {
            threshold: 0.1
        });

        this.blocks.forEach((el) => {
            observed.observe(el);
        });


        if (this.headerContainer) {
            window.addEventListener('scroll', () => {
                this.addStyleScroll();
            });
            this.addSmoothScroll();
        }

        if (this.closeBtns.length && this.burgerMenu) {
            this.burgerMenu.addEventListener('click', () => {
                app.scroll.disable();

                this.openModileMenu();
                this.addOpenClassOnCloseBtn();
                this.TabOnShowMobileMenu()

            });

            this.closeBtns.forEach((btn) => {
                btn.addEventListener('click', () => {
                    app.scroll.enable();
                    this.closeMobileMenu();
                    this.removeOpenClassOnCloseBtn();

                });
            })


        }
    }


    addActiveItem(newActive) {
        this.activeAnchorId = newActive;
        for (let item of this.anchors) {
            if (item.hash == this.activeAnchorId) {
                item.classList.add(this.config.activeClass);
            } else {
                item.classList.remove(this.config.activeClass);
            }
        }
    }

    addSmoothScroll() {
        for (let anchor of this.anchors) {
            anchor.addEventListener('click', (evt) => {
                evt.preventDefault();
                document.querySelector(anchor.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
                history.pushState(null, null, anchor.getAttribute('href'));
            });
        }
    }

    addStyleScroll() {
        this.headerHeight = this.headerContainer.offsetHeight;
        const coordY = window.scrollY;
        if (coordY > this.headerHeight) {
            this.headerContainer.classList.add(this.config.scrollClass);
        } else if (coordY < this.headerHeight) {
            this.headerContainer.classList.remove(this.config.scrollClass);
        }
    }

    openModileMenu() {
        this.navigation.classList.add(this.config.openClass);
    }

    closeMobileMenu() {
        this.navigation.classList.remove(this.config.openClass);
    }

    addOpenClassOnCloseBtn() {
        this.closeBtns.forEach((btn) => {
            btn.classList.add(this.config.openClass);
        });
    }

    removeOpenClassOnCloseBtn() {
        this.closeBtns.forEach((btn) => {
            btn.classList.remove(this.config.openClass);
        });
    }

    TabOnShowMobileMenu() {
        this.navigation.setAttribute('tabindex', '0');
        this.navigation.focus();
    }



}