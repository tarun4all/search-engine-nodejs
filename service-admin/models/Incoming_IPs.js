const keystone = require('keystone');

const Incoming_IP = new keystone.List('Incoming_IP');

Incoming_IP.add({
    IP: { type: String, required: true, index: true, initial: true},
    // Location : { type: String},
    url: { type: String},
});

Incoming_IP.defaultColumns = 'IP, url';
Incoming_IP.register();
