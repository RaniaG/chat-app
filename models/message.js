const mongoose = require('mongoose');
var Schema = mongoose.Schema;
const messageSchema = new Schema({
    sender: {
        type: Schema.Types.ObjectId,
        required: true,
        ref:'users'
    },
    reciever: {
        type: Schema.Types.ObjectId,
        required: true,
        ref:'users'
    },
    message: {
        required: 'Message is required',
        type: String,
        required: true,
    },
    time: {
        type: Date,
        default: Date.now,
        required: true
    },
});

module.exports = mongoose.model('message', messageSchema);

// const newMessage = new Message({ sender: "5ca8a8cead4b6611588e50e0", reciever: "5ca8a80c5428f510e4ad6c34", message: 'hello' });
// newMessage.save().then(() => console.log('meow')).catch(e => console.log(e));