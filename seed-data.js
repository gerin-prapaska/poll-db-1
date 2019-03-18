const fs = require("fs");
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./database.db");

const politiciansFile = fs.readFileSync("./politicians.csv", "utf8");
const votersFile = fs.readFileSync("./voters.csv", "utf8");
const votesFile = fs.readFileSync("./votes.csv", "utf8");

const politiciansArr = politiciansFile.split("\n").map((politician) => politician.split(","));
const votersArr = votersFile.split("\n").map((voter) => voter.split(","));
const votesArr = votesFile.split("\n").map((vote) => vote.split(","));

// console.log(politiciansArr);
// console.log(votersArr);
// console.log(votesArr);

/*
// Cara pertama
db.serialize(function() {
  for (let i = 1; i < politiciansArr.length; i++) {
    const insertPolitician = `
      INSERT INTO Politicians (name, party, location, grade_current)
      VALUES 
        ('${politiciansArr[i][0]}', '${politiciansArr[i][1]}', '${politiciansArr[i][2]}', ${politiciansArr[i][3]})
    `;

    db.run(insertPolitician, function(err) {
      if (err) {
        throw err;
      } else {
        console.log("Insert politician success");
      }
    });
  }

  for (let i = 1; i < votersArr.length; i++) {
    const insertVoter = `
      INSERT INTO Voters (first_name, last_name, gender, age)
      VALUES
        ("${votersArr[i][0]}", "${votersArr[i][1]}", "${votersArr[i][2]}", ${votersArr[i][3]})
    `;

    db.run(insertVoter, function(err) {
      if (err) {
        throw err;
      } else {
        console.log("Insert voter success");
      }
    });
  }

  for (let i = 1; i < votesArr.length; i++) {
    const insertVote = `
      INSERT INTO Votes (voter_id, politician_id)
      VALUES
        (${votesArr[i][0]}, ${votesArr[i][1]})
    `;

    db.run(insertVote, function(err) {
      if (err) {
        throw err;
      } else {
        console.log("Insert vote success");
      }
    });
  }
});
*/

db.serialize(function() {
  let stmt = db.prepare("INSERT INTO Politicians VALUES (null, ?, ?, ?, ?)");
  for (let i = 1; i < politiciansArr.length; i++) {
    stmt.run(`${politiciansArr[i][0]}`, `${politiciansArr[i][1]}`, `${politiciansArr[i][2]}`, `${politiciansArr[i][3]}`, function(err) {
      if (err) console.log(err);
      else console.log("Insert politician success");
    });
  }
  stmt.finalize();

  stmt = db.prepare("INSERT INTO Voters VALUES (null, ?, ?, ?, ?)");
  for (let i = 1; i < votersArr.length; i++) {
    stmt.run(`${votersArr[i][0]}`, `${votersArr[i][1]}`, `${votersArr[i][2]}`, `${votersArr[i][3]}`, function(err) {
      if (err) console.log(err);
      else console.log("Insert voter success");
    });
  }
  stmt.finalize();

  stmt = db.prepare("INSERT INTO Votes VALUES (null, ?, ?)");
  for (let i = 1; i < votesArr.length; i++) {
    stmt.run(`${votesArr[i][0]}`, `${votesArr[i][1]}`, function(err) {
      if (err) console.log(err);
      else console.log("Insert vote success");
    });
  }
  stmt.finalize();
});

db.close();