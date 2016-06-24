'use strict';

require('./index.scss');
const grid = require('./js/grid');
const $ = require('jquery/dist/jquery.min');
const socket = require('./js/socket');

console.log("App is ready!!");

if (module.hot) {
  module.hot.accept();
}

socket.init();
