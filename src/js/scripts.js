"use strict";
import svg4everybody from 'svg4everybody';
import scrollLock from 'scroll-lock';


import Header from './components/header.js';
import Tab from './components/tabs.js';

window.app = {
  header: null,
  scroll: {
    disable: scrollLock.disablePageScroll,
    enable: scrollLock.enablePageScroll
  },

  initModule(Module, selector) {
    if (!!selector) {
      let blocks = Array.prototype.slice.call(document.querySelectorAll(selector));
      blocks.forEach(block => {
        new Module(block);
      });
    } else {
      new Module();
    }
  },

  init() {}
};


window.addEventListener('DOMContentLoaded', () => {
  app.header = new Header(".js-header");
  let tabs = new Tab(".js-tags");
});

svg4everybody();