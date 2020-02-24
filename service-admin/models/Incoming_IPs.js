const keystone = require('keystone');
const Types = keystone.Field.Types;

const Incoming_IP = new keystone.List('Incoming_IP', {
    track: {createdAt:true,},
    nocreate: true,
});

Incoming_IP.add({
    IP: {type: String, required: true, index: true, initial: true},
    url: {type: String},
    blockIp: {type: Types.Boolean},
});
Incoming_IP.defaultColumns = 'IP, url';
Incoming_IP.register();

// console.log('*********', Incoming_IP.model.schema);
Incoming_IP.model.schema.pre('save', async function (next) {
    console.log('in pre of incoming ips >>>>>>>>>');
    if(this.blockIp){
        let Blocked_IP = keystone.list('Blocked_IP').model;
        console.log('blocked ip', this.IP);

        let blockedIp = new Blocked_IP({
            IP: this.IP,
        });
        await blockedIp.save();
    }
    next();
});


