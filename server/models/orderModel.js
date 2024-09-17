/* Order Data
  {

      "category": "Pick || Drop",
      "departure": "Lentäjäntie 3, 01530 Vantaa",
      "destination": "Lakitie 8 E 7 02770 Espoo",
      "persons": 3,
      "luggages": 4,
      "flight": "E4448",
      "date": "02.03.2024",
      "passenger": "333",
      "driver": "222",
      "comments": "Child seat required ",
      "price": 888,
      "status": "new || accepted || completed || closed",
      "created": "02.03.2024",
      "modified": "02.03.2024",
      "completed": "02.03.2024",
       }
*/

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const orderSchema = new Schema(
  {
    category: {
        type: String,
        required: true
    },

    departure: {
        type: String,
        required: true
    },

    destination: {
        type: String,
        required: true
    },

    persons: {
        type: Number,
        required: true
    },

    luggages: {
        type: Number,
        required: true
    },

    flight: {
        type: String,
        required: true
    },

    date: {
        type: Date,
        required: true
    },

    passenger: {
        type: String,
        required: true
    },

    driver: {
        type: String,
        required: true
    },

    comments: {
        type: String
    },

    price: {
        type: Number,
        required: true
    },

    status: {
        type: String,
        enum: ['new', 'accepted', 'completed', 'closed'],
        default: 'new'
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Order', orderSchema);
