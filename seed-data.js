const fs = require("fs");
const csv = require("csv-parser");
const APP = require("./app.js");
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./database.db", err => {
  if (err) {
    console.log(err);
  } else {
    console.log(`ghotcha, connected to the database`);
  }
});

const seed = (table, filePath) => {
  const result = [];
  fs.createReadStream(filePath)
    .pipe(csv())
    .on("data", data => {
      let value = Object.values(data);
      let placeholders = value.map(val => "?").join(", ");
      let keys = Object.keys(data)
        .map(el => el)
        .join(", ");
      // console.log(keys);
      // console.log(data);
      let stmt = db.prepare(
        `INSERT INTO ${table} (${keys}) VALUES (${placeholders})`
      );
      stmt.run(value);
      stmt.finalize(err => {
        if (err) console.log(err);
        console.log("berhasill");
      });
      result.push(data);
    })
    .on("end", () => {});
};

// seed("candidate", "./politicians.csv");
// seed("voter", "./voters.csv");
// seed("vote", "./votes.csv");
