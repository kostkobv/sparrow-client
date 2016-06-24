'use strict';

const config = require('./config.json');
const Kalm = require('./vendor/kalm');
const ws = require('./vendor/kalm-websocket');

function registerClient() {
	Kalm.adapters.register('ws', ws);

	return new Kalm.Client({
		hostname: config.HOSTNAME,
		port: config.PORT,
		adapter: 'ws'
	});
}

function subscribe(client) {
	client.subscribe('tweets', (data) => {
		console.log(data);
	});
}

export function init() {
	const client = registerClient();

	subscribe(client);
}
