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

app.post("/api/customers", (req, res) => {
  const { name, phoneNumber } = req.body;
  if (!name || !phoneNumber) {
    return res
      .status(400)
      .json({ error: "Name and phone number are required." });
  }

  const checkQuery = `SELECT * FROM customers2 WHERE phoneNumber = '${phoneNumber}'`;
  db.get(checkQuery, (error, row) => {
    if (error) {
      console.error("Error querying the database:", error);
      return res.status(500).json({ error: "An unexpected error occurred." });
    }

    if (row) {
      return res.status(409).json({ error: "Phone number already exists." });
    }

    const insertQuery = `INSERT INTO customers2 (name, phoneNumber) VALUES ('${name}', '${phoneNumber}')`;
    db.run(insertQuery, function (error) {
      if (error) {
        console.error("Error inserting customer into the database:", error);
        return res.status(500).json({ error: "An unexpected error occurred." });
      }

      return res.status(200).json({ message: "Customer added successfully." });
    });
  });
});
