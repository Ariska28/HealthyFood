"use strict";
import svg4everybody from 'svg4everybody';
import scrollLock from 'scroll-lock';

import testServerRequest from './components/test-server-request.js'

svg4everybody();

window.app = {
  header: null,
  scroll: {
    disable: scrollLock.disablePageScroll,
    enable: scrollLock.enablePageScroll
  },
  setInert(...args) {
    args.forEach(item => {
      item.setAttribute('inert', true);
    })
  },
  removeInert(...args) {
    args.forEach(item => {
      item.removeAttribute('inert');
    })
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

  init () {
    app.initModule(testServerRequest, '.js-test-api');
  }

};


window.addEventListener('DOMContentLoaded', app.init);