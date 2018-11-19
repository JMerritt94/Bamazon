var mysql = require("mysql");
var inquirer = require("inquirer");
var table = require('cli-table');



console.log("sup")
var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "root",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  shop();
});

var shop = function() {
  connection.query("SELECT * FROM products", function(err, res) {
    console.log("---------------------------------");
    console.log("Available Products");
    console.log("---------------------------------");

    //New Table instance to format returned sql data
    var newTable = new table({
      head: ["ID", "Name", "Price", "Quantity"],
      colWidths: [10, 40, 10, 10]
    });
    for (var i = 0; i < res.length; i++) {
      var productArray = [
        res[i].item_id,
        res[i].product_name,
        res[i].price,
        res[i].stock_quantity
      ];
      newTable.push(productArray);
    }
    console.log(newTable.toString());
    purchase();
  });
};

var purchase = function() {
  inquirer
    .prompt([
      {
        name: "Item",
        type: "input",
        message: "Choose the ID of the item you want to purchase",
        validate: function(value) {
          //Validates answer
          if (isNaN(value) === false) {
            return true;
          } else {
            console.log(
              "\nPlease enter only the item ID of the item you'd like to buy\n"
            );
            return false;
          }
        }
      },
      {
        name: "Qty",
        type: "input",
        message: "How many would you like to purchase?",
        validate: function(value) {
          //validates answer
          if (isNaN(value) === false) {
            return true;
          } else {
            console.log("\nPlease enter a valid quantity\n");
            return false;
          }
        }
      }
    ])
    .then(function(answer) {
      var ItemInt = parseInt(answer.Qty);

      //Cycles the DB
      connection.query(
        "SELECT * FROM products WHERE ?",
        [{ item_id: answer.Item }],
        function(err, data) {
          if (err) throw err;

          //Checks if there are enough items left
          if (data[0].stock_quantity < ItemInt) {
            console.log("We're sorry, that item is out of stock\n");
            console.log("Please choose another item\n");
            purchase();
          } else {
            //If there are enough items the DB is updated
            var updateQty = data[0].stock_quantity - ItemInt;
            var totalPrice = data[0].price * ItemInt;
            connection.query(
              "UPDATE products SET stock_quantity = ? WHERE item_id = ?",
              [updateQty, answer.Item],
              function(err, results) {
                if (err) {
                  throw err;
                } else {
                  console.log("Purchase complete!\n");
                  console.log("Your total cost is: $ " + totalPrice);

                  //Asks the shopper if they would like to continue shopping
                  inquirer
                    .prompt({
                      name: "addPurchase",
                      type: "confirm",
                      message: "Would you like to purchase another product?"
                    })
                    .then(function(answer) {
                      if (answer.addPurchase === true) {
                        shop();
                      } else {
                        console.log("Thank you. Come again!");
                        connection.end();
                      }
                    });
                }
              }
            );
          }
        }
      );
    });
};
