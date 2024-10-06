const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const messageSchema = new Schema(
  {
    sender: { 
        type: Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },

    receiver: { 
        type: Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },

    order: { 
        type: Schema.Types.ObjectId, 
        ref: 'Order', 
        required: true 
    },

    content: { 
        type: String, 
        required: true 
    },
  }, 
  { timestamps: true }
);

module.exports = mongoose.model('Message', messageSchema);
