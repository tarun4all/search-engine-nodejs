const keystone = require('keystone');
const Types = keystone.Field.Types;

const Blocked_IP = new keystone.List('Blocked_IP');

Blocked_IP.add({
	IP: { type: String, required: true, index: true, initial: true },
	Remarks:{ type:Types.Textarea, required: false, initial:true },
});

Blocked_IP.defaultColumns = 'IP, Remarks';
Blocked_IP.register();
