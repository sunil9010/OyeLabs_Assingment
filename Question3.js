const express = require("express");
const path = require("path");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");

const dbPath = path.join(__dirname, "userData.db");
const app = express();

app.use(express.json());

let db = null;

const initializeDBAndServer = async () => {
  try {
    db = await open({ filename: dbPath, driver: sqlite3.Database });
    app.listen(3000, () => {
      console.log("Server Running at http://localhost:3000/");
    });
  } catch (e) {
    console.log(`DB Error: ${e.message}`);
    process.exit(-1);
  }
};
initializeDBAndServer();

// 3. Write a function in node that inserts the following data in mysql , the email should
// be unique and if the email already exists in the system then the name of the customer
// will be updated with the new name that is there in the array for that customer.

// POST API to insert/update customer data
app.post("/customers", async (req, res) => {
  const customers = [
    {
      email: "anurag11@yopmail.com",
      name: "anurag",
    },
    {
      email: "sameer11@yopmail.com",
      name: "sameer",
    },
    {
      email: "ravi11@yopmail.com",
      name: "ravi",
    },
    {
      email: "akash11@yopmail.com",
      name: "akash",
    },
    {
      email: "anjali11@yopmail.com",
      name: "anjali",
    },
    {
      email: "santosh11@yopmail.com",
      name: "Santosh",
    },
  ];

  try {
    for (const customer of customers) {
      const { email, name } = customer;

      // Check if the email already exists in the database
      const existingCustomer = await db.get(
        `SELECT * FROM customers WHERE email = '${email}'`
      );

      if (existingCustomer) {
        // Email already exists, update the name for the customer
        await db.run(
          `UPDATE customers SET name = '${name}' WHERE email = '${email}'`
        );
      } else {
        // Email doesn't exist, insert the customer into the database
        await db.run(
          `INSERT INTO customers (name, email) VALUES ('${name}', '${email}')`
        );
      }
    }

    res.send("Customers data inserted/updated successfully");
  } catch (e) {
    console.log(`DB Error: ${e.message}`);
    res.status(500).send("Internal server error");
  }
});

app.get("/customers", async (req, res) => {
  try {
    const query = `SELECT * FROM customers`;
    const customers = await db.all(query);
    res.json(customers);
  } catch (e) {
    console.log(`DB Error: ${e.message}`);
    res.status(500).send("Internal server error");
  }
});
