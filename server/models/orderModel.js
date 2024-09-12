// order data
// {

//     "category": "Pick || Drop",
    
//     "departure": "Lentäjäntie 3, 01530 Vantaa",
    
//     "destination": "Lakitie 8 E 7 02770 Espoo",
    
//     "persons": 3,
    
//     "luggages": 4,
    
//     "flight": "E4448",
    
//     "date": "02.03.2024",
    
//     "passenger": "333",
    
//     "driver": "222",
    
//     "comments": "Child seat required ",
    
//     "price": 888,
    
//     "status": "new || accepted || completed || closed",
    
//     "created": "02.03.2024",
    
//     "modified": "02.03.2024",
    
//     "completed": "02.03.2024",
    
//      }

let orders = [];
let nextId = [];

function getAllOrder() {
    return orders;
}

function addOneOrder(order) {
    const {
        category, departure, destination, persons, luggages,
        flight, date, passenger, driver, comments, price, status
    } = order;

    if (!category || !departure || !destination || !persons || !luggages ||
        !flight || !date || !passenger || !driver || !price || !status) {
        return false;
    }

    const newOrder = {
        orderId: nextId++,
        created: new Date().toISOString(),
        modified: new Date().toISOString(),
        ...order,
    };

    orders.push(newOrder);
    return newOrder;
}

function findOrderById(orderId) {
    return orders.find(order => order.id == orderId)||false;
}

function updateOrderById(orderId, updatedData) {
    const order = findOrderById(orderId);

    if (order) {
        Object.assign(order, updatedData, {
            modified: new Date().toISOString(),
        });
        return order;
    }

    return null;
}

function deleteOrderById(orderId) {
    const order = findOrderById(orderId);

    if (order) {
        const initialLength = orders.length;
        orders = orders.filter(order => order.id !== Number(orderId));
        return orders.length < initialLength;
    }

    return false;
}


module.exports = {
    getAllOrder,
    addOneOrder,
    findOrderById,
    updateOrderById,
    deleteOrderById,
};
