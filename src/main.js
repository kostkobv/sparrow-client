'use strict';

require('./index.scss');
const $ = require('../node_modules/jquery/dist/jquery.min');
const socket = require('./js/socket');

console.log("App is ready!!");

if (module.hot) {
  module.hot.accept();
}

$(document).ready(socket.init);
