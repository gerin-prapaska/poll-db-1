const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./database.db");
const args = process.argv.slice(2);

console.log(args);
let query = "";

if (args[0].toLowerCase() === "politicians") {
  query = `
    INSERT INTO Politicians (id, name, party, location, grade_current)
    VALUES
      (null, "${args[1]}", "${args[2]}", "${args[3]}", "${args[4]}")
  `;

  db.run(query, function(err) {
    if (err) {
      throw err;
    } else {
      console.log("Insert politician success");
    }
  });
} else if (args[0].toLowerCase() === "voters") {
  query = `
    INSERT INTO Voters (id, first_name, last_name, gender, age)
    VALUES
      (null, "${args[1]}", "${args[2]}", "${args[3]}", ${args[4]})
  `;

  db.run(query, function(err) {
    if (err) {
      throw err;
    } else {
      console.log("Insert voter success");
    }
  });
} else if (args[0].toLowerCase() === "votes") {
  query = `
    INSERT INTO Votes (id, voter_id, politician_id)
    VALUES
      (null, ${args[1]}, ${args[2]})
  `;

  db.run(query, function(err) {
    if (err) {
      throw err;
    } else {
      console.log("Insert vote success");
    }
  });
}