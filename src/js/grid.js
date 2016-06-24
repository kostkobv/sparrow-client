'use strict';

const config = require('./config.json');
const $ = require('../../node_modules/jquery/dist/jquery.min');
require('../../node_modules/isotope-layout/dist/isotope.pkgd.min');

export function init() {
	return $(config.GRID_SELECTOR).isotope({
		itemSelector: config.GRID_ITEM_SELECTOR,
		layoutMode: config.GRID_STYLE
	});
}

export function addItem(item) {

}

export function addItems(items) {

}
