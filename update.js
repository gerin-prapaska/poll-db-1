const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./database.db");
const args = process.argv.slice(2);

console.log(args);
let query = "";

if (args[0].toLowerCase() === "politicians") {
  query = `
    UPDATE Politicians
    SET name          = "${args[2]}",
        party         = "${args[3]}",
        location      = "${args[4]}",
        grade_current = "${args[5]}"
    WHERE id = ${args[1]}
  `;

  db.run(query, function(err) {
    if (err) {
      throw err;
    } else {
      console.log("Update politician success");
    }
  });
} else if (args[0].toLowerCase() === "voters") {
  query = `
    UPDATE Voters
    SET first_name  = "${args[2]}",
        last_name   = "${args[3]}",
        gender      = "${args[4]}",
        age         = "${args[5]}"
    WHERE id = ${args[1]}
  `;

  db.run(query, function(err) {
    if (err) {
      throw err;
    } else {
      console.log("Update voter success");
    }
  });
} else if (args[0].toLowerCase() === "votes") {
  query = `
    UPDATE Votes
    SET voter_id        = "${args[2]}",
        politician_id   = "${args[3]}"
    WHERE id = ${args[1]}
  `;

  db.run(query, function(err) {
    if (err) {
      throw err;
    } else {
      console.log("Update vote success");
    }
  });
}