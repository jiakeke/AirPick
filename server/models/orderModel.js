// // order data
// // {

// //     "category": "Pick || Drop",
    
// //     "departure": "Lentäjäntie 3, 01530 Vantaa",
    
// //     "destination": "Lakitie 8 E 7 02770 Espoo",
    
// //     "persons": 3,
    
// //     "luggages": 4,
    
// //     "flight": "E4448",
    
// //     "date": "02.03.2024",
    
// //     "passenger": "333",
    
// //     "driver": "222",
    
// //     "comments": "Child seat required ",
    
// //     "price": 888,
    
// //     "status": "new || accepted || completed || closed",
    
// //     "created": "02.03.2024",
    
// //     "modified": "02.03.2024",
    
// //     "completed": "02.03.2024",
    
// //      }

// let orders = [];
// let nextId = 1;

// function getAllOrder() {
//     return orders;
// }

// function addOneOrder(order) {
//     const {
//         category, departure, destination, persons, luggages,
//         flight, date, passenger, driver, comments, price, status
//     } = order;

//     if (!category || !departure || !destination || !persons || !luggages ||
//         !flight || !date || !passenger || !driver || !price || !status) {
//         return false;
//     }

//     const newOrder = {
//         Id: nextId++,
//         created: new Date().toISOString(),
//         modified: new Date().toISOString(),
//         ...order,
//     };

//     orders.push(newOrder);
//     return newOrder;
// }

// function findOrderById(orderId) {
//     return orders.find(order => order.Id == orderId)||false;
// }

// function updateOrderById(orderId, updatedData) {
//     const order = findOrderById(orderId);

//     if (order) {
//         Object.assign(order, updatedData, {
//             modified: new Date().toISOString(),
//         });
//         return order;
//     }

//     return null;
// }

// function deleteOrderById(orderId) {
//     const order = findOrderById(orderId);

//     if (order) {
//         const initialLength = orders.length;
//         orders = orders.filter(order => order.id !== Number(orderId));
//         return orders.length < initialLength;
//     }

//     return false;
// }


// module.exports = {
//     getAllOrder,
//     addOneOrder,
//     findOrderById,
//     updateOrderById,
//     deleteOrderById,
// };

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderSchema = new Schema(
  {
    category: { type: String, required: true },
    departure: { type: String, required: true },
    destination: { type: String, required: true },
    persons: { type: Number, required: true },
    luggages: { type: Number, required: true },
    flight: { type: String, required: true },
    date: { type: Date, required: true },
    passenger: { type: String, required: true },
    driver: { type: String, required: true },
    comments: { type: String },
    price: { type: Number, required: true },
    status: { type: String, enum: ['new', 'accepted', 'completed', 'closed'], default: 'new' }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Order', orderSchema);
