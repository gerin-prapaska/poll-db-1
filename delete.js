const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./database.db");
const args = process.argv.slice(2);

console.log(args);
let query = "";

if (args[0].toLowerCase() === "politicians") {
  query = `
    DELETE FROM Politicians WHERE id = ${args[1]}
  `;

  db.run(query, function(err) {
    if (err) {
      throw err;
    } else {
      console.log("Delete politician success");
    }
  });
} else if (args[0].toLowerCase() === "voters") {
  query = `
    DELETE FROM Voters WHERE id = ${args[1]}
  `;

  db.run(query, function(err) {
    if (err) {
      throw err;
    } else {
      console.log("Delete voter success");
    }
  });
} else if (args[0].toLowerCase() === "votes") {
  query = `
    DELETE FROM Votes WHERE id = ${args[1]}
  `;

  db.run(query, function(err) {
    if (err) {
      throw err;
    } else {
      console.log("Delete vote success");
    }
  });
}