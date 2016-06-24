'use strict';

const config = require('./config.json');
const Kalm = require('./vendor/kalm');
const ws = require('./vendor/kalm-websocket');
const grid = require('./grid');

/**
 * Registers socket client
 */
function registerClient() {
	Kalm.adapters.register('ws', ws);

	return new Kalm.Client({
		hostname: config.SOCKET_HOSTNAME,
		port: config.SOCKET_PORT,
		adapter: 'ws',
		percentPosition: true,
		masonry: {
			columnWidth: config.GRID_ITEM_SELECTOR
		}
	});
}

/**
 * Subscribes socket client to receive tweets
 *
 * @param client - socket client instance
 */
function subscribe(client) {
	client.subscribe(config.SOCKET_TWEETS_CHANNEL, (tweets) => {
		grid.addItems(tweets);
	});

	client.subscribe(config.SOCKET_TWEET_CHANNEL, (tweet) => {
		grid.addItem(tweet);
	});
}

/**
 * Inits socket service
 */
export function init() {
	const client = registerClient();

	grid.init();
	subscribe(client);
}
