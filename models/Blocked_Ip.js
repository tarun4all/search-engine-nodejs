const keystone = require('keystone');

const Blocked_IP = new keystone.List('Blocked_IP');

Blocked_IP.add({
	IP: { type: String, required: true, index: true, initial: true },
});

Blocked_IP.defaultColumns = 'IP';
Blocked_IP.register();