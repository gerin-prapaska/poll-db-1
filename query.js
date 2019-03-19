const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./database.db");

function nomor1() {
  const query = `
    SELECT * FROM Politicians
    WHERE party = 'R' AND grade_current BETWEEN 9 AND 11
  `;

  db.all(query, function(err, rows) {
    if (err) {
      throw err;
    } else {
      console.log(rows);
    }
  });
}

function nomor2() {
  const query = `
    SELECT COUNT(*) AS totalVote, name FROM Politicians
    JOIN Votes
    ON Votes.politician_id = Politicians.id
    WHERE name = 'Olympia Snowe';
  `;

  db.all(query, function(err, rows) {
    if (err) {
      throw err;
    } else {
      console.log(rows);
    }
  });
}

function nomor3() {
  const query = `
    SELECT name, COUNT(*) AS totalVote FROM Politicians
    JOIN Votes
    ON Votes.politician_id = Politicians.id
    WHERE name LIKE 'Adam %'
    GROUP BY name;  
  `;

  db.all(query, function(err, rows) {
    if (err) {
      throw err;
    } else {
      console.log(rows);
    }
  });
}

function nomor4() {
  const query = `
    SELECT COUNT(*) AS totalVote, name, party, location FROM Politicians
    JOIN Votes
    ON Votes.politician_id = Politicians.id
    GROUP BY name
    ORDER BY totalVote DESC
    LIMIT 3;  
  `;

  db.all(query, function(err, rows) {
    if (err) {
      throw err;
    } else {
      console.log(rows);
    }
  });
}

function nomor5() {
  const query = `
    SELECT first_name, last_name, gender, age FROM Voters
    JOIN votes
    ON Voters.id = voter_id
    JOIN Politicians
    ON politician_id = Politicians.id
    WHERE name = 'Olympia Snowe';  
  `;

  db.all(query, function(err, rows) {
    if (err) {
      throw err;
    } else {
      console.log(rows);
    }
  });
}

// nomor1();
// nomor2();
// nomor3();
// nomor4();
// nomor5();