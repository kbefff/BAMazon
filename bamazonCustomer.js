// -- 5. Then create a Node application called `bamazonCustomer.js`. 
// require('console.table');
var mysql = require('mysql');
var inquirer = require('inquirer');

// ======================================== MYSQL CONNECTION ==========================================
var connection = mysql.createConnection({
    howst: 'localhost',
    port: 3306,
    user: 'root',
    password: 'password',
    database: 'bamazon'
});

connection.connect(function (err) {
    if (err) throw err;
    console.log('==============================================');
    console.log('');

    console.log('we are connected as id: ' + connection.threadId);
    console.log('');
    console.log('==============================================');
    readProducts();

});

// ====================================================================================================


// Running this application will first display all of the Products available for sale. Include the ids, names, and prices of products for sale.
function readProducts() {

    connection.query('SELECT * FROM bamazon.products', function (err, results, fields) {
        if (err) throw err;
        console.log('==============================================');
        console.log('');
        console.table(results);
        console.log('');
        console.log('==============================================');
        orderPrompt();

    });
};

function orderPrompt() {

    inquirer
        .prompt([{
                name: "choice",
                type: "rawlist",
                choices: function () {
                    var choiceArray = [];
                    for (var i = 0; i < results.length; i++) {
                        choiceArray.push(results[i].product_name);
                    }
                    return "this is the" + choiceArray;
                },
                message: "Which product would you like to purchase?"
            },
            {
                name: 'units',
                type: 'input',
                message: 'How many units of the product they would you like to buy?'
            }
        ])
        .then(function (answer) {




        });
}

function checkItem(itemId, numUnits) {

    connection.query('SELECT * FROM bamazon.products;', function (err, results, fields) {
        var itemIdInt = parseInt(itemID);
        var numUnitsInt = parseInt(numUnits);
        var chosenProduct;
        for (var i = 0; i < results.length; i++) {
            if (results[i].item_id === itemIdInt) {
                chosenProduct = results[i];
            }
        }

        if (chosenProduct.stock_quantity < numUnitsInt) {
            console.log("Insufficient quantity in stock!")
            prompt();
        } else {
            fulfillOrder(chosenProduct, numUnitsInt);
        }

    });

}

function fulfillOrder(chosenItem, numUnitsInt) {
    let newStock = chosenItem.stock_quantity - numUnitsInt;
    let totalPrice = chosenItem.price * numUnitsInt;
    connection.query(
        "UPDATE products SET ? WHERE ?",
        [{
                stock_quantity: newStock
            },
            {
                item_id: chosenItem.item_id
            }
        ],
        function (error) {
            if (error) throw err;
            console.log(`You bought ${numUnitsInt} units of the ${chosenItem.product_name}. You spent a total of $${totalPrice}.`);
            connection.end();
        }
    );
};