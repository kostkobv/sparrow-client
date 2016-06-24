'use strict';

const config = require('./config.json');
const $ = require('../../node_modules/jquery/dist/jquery.min');
const Isotope = require('../../node_modules/isotope-layout/dist/isotope.pkgd.min');
const Mustache = require('mustache');
const _ = require('lodash');
import template from '../templates/item.html';

let grid;
let itemTemplate;
const items = {};
const GRID_ITEM_SELECTOR = `.${config.GRID_ITEM_CLASS}`;
const $gridEl = $(config.GRID_SELECTOR);

/**
 * Clears the grid element
 */
export function clear() {
	$(config.GRID_SELECTOR).empty();
}

/**
 * Inits the grid and all listeners for it
 *
 * @returns {*} - grid
 */
export function init() {
	clear();

	if (!grid) {
		grid = new Isotope(config.GRID_SELECTOR, {
			itemSelector: GRID_ITEM_SELECTOR,
			layoutmode: 'packery',
			resize: false,
			columnWidth: GRID_ITEM_SELECTOR
		});

		itemTemplate = Mustache.parse(template);
	}

	$(window).on('resize', _.debounce(render, 500));

	return grid;
}

/**
 * Creates DOM element for item that should be added
 *
 * @param item - object with tweet data
 * @returns {jQuery|HTMLElement}
 */
function createDomItem(item) {
	item.text = decodeURI(item.text);
	Object.assign(item, { itemClass: config.GRID_ITEM_CLASS });
	const el = Mustache.render(template, item);

	return $(el);
}

/**
 * Adds item to the grid
 *
 * @param item - item that should be added
 * @param silence - defines if rerender would be triggered after adding or not
 * @returns {*} - DOM element for item
 */
export function addItem(item, silence) {
	if (items[item.id]) {
		return;
	}

	const $domItem = createDomItem(item);

	items[item.id] = item;
	$gridEl.prepend($domItem);

	if (!silence) {
		grid.prepended($domItem[0]);
		$domItem.find('img').on('load', render);
		render();
	}

	return $domItem[0];
}

/**
 * Adds collection of items to the grid
 *
 * @param items - collection of items that should be added
 * @returns {Array} - collection of DOM elements that was added to the grid
 */
export function addItems(items) {
	var domItems = [];

	for (const item of items) {
		const domItem = addItem(item, true);
		domItems.push(domItem);
	}

	grid.prepended(domItems);

	$gridEl.find('img').on('load', _.debounce(render, 50));
	render();

	return domItems;
}

/**
 * Rerenders the grid
 */
export function render() {
	grid.arrange();
}
