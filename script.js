"use strict";

const patisserie = {
    bananaCaramel: {
        stock: 3,
        price: 9.99,
    },
    contessa: {
        stock: 5,
        price: 7.99,
    },
    concorde: {
        stock: 11,
        price: 22.99,
    },
    mouseCake: {
        stock: 8,
        price: 16.99,
    },
    confettiSuprise: {
        stock: 9,
        price: 14.99,
    },
};

const checkOrder = (order) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            let inStock = patisserie[order[0]].stock >= order[1];

            if (inStock) {
                let totalCost = 0;
                totalCost += order[1] * patisserie[order[0]].price;

                console.log(
                    `All of the items are in stock. The total cost of the order is ${totalCost}.`
                );
                resolve([order, totalCost]);
            } else {
                reject(
                    `The order could not be completed because some items are sold out.`
                );
            }
        }, 1000);
    });
};



const payment = (resolvedValueArray) => {
    return new Promise((resolve, reject) => {
        let order = resolvedValueArray[0];
        let totalCost = resolvedValueArray[1];
        console.log(totalCost)
        setTimeout(() => {
            console.log(` ${totalCost} will be charged from your card. Press "1" if it is ok?`)
            document.addEventListener("keydown", function(event) {
                let entryKey = event.key;
                if (entryKey === "1") {
                    console.log(`Payment processed completed. You paid ${totalCost} $`);
                    resolve(order)
                } else {
                    reject(`You pressed another key, can not process order.`);
                }
            });
        }, 2000);
    })
}

const stockControl = (order) => {
    return new Promise((resolve, reject) => {
        console.log("To Cashier: Wait for checking stock...")
        setTimeout(() => {
            patisserie[order[0]].stock = patisserie[order[0]].stock - order[1]; // updating original amount
            if (patisserie[order[0]].stock > 1) {
                resolve(`Good Sale! ${order[0]} stock is enough : ${patisserie[order[0]].stock}`);
            } else {
                reject(`Warning! ${order[0]} stock is ${patisserie[order[0]].stock} and it is critic`);
            }
        }, 2000);
    });
}


const cakeType = document.getElementById('cakeSelect');
const orderAmount = document.getElementById('cakeAmount');
const orderBtn = document.getElementById('submit_btn');



orderBtn.onclick = () => {

    console.log(`You ordered ${orderAmount.value} ${cakeType.options[cakeType.selectedIndex].text}.`)

    const order = [cakeType.value, orderAmount.value];

    checkOrder(order)
        .then((resolvedValueFromcheckOrder) => {
            return payment(resolvedValueFromcheckOrder);
        })
        .then((resolvedValueFromPayment) => {
            return stockControl(resolvedValueFromPayment);
        })
        .then((successMessageFromcheckStock) => {
            console.log(successMessageFromcheckStock);
        })
        .catch(errorMessageFromAnyPromise => {
            console.log(errorMessageFromAnyPromise);
        })
        .finally(() => {
            console.log("Thank you for choosing us!");
        });

}