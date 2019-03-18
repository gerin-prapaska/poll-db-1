// Muhammad Ramadhoni
// p1-w3 poll-db-1

const db = require('./db');

db.serialize(() => {
  // ---no_1---
  db.all(
    `SELECT name, party, grade_current
    FROM politicians
    WHERE party = 'R'
      AND 
      grade_current BETWEEN 9 AND 11
    ORDER BY grade_current;
    `, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        console.log(data);
        console.table(data)
      }
  })

  // ---no_2---
  db.all(
    `SELECT COUNT(*) AS totalVote, name
    FROM votes
    JOIN politicians
      ON politician_id = politicians.id
    WHERE name = 'Olympia Snowe'
    GROUP BY name;
    `, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        console.log(data);
        console.table(data)
      }
  })

  // ---no_3---
  db.all(
    `SELECT name, COUNT(*) AS totalVote
    FROM votes
    JOIN politicians
      ON politician_id = politicians.id
    WHERE name LIKE '%Adam%'
    GROUP BY name;
    `, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        console.log(data);
        console.table(data)
      }
  })

  // ---no_4---
  db.all(
    `SELECT COUNT(*) AS totalVote, name, party, location
    FROM votes
    JOIN politicians
      ON politician_id = politicians.id
    GROUP BY name
    ORDER BY totalVote DESC
    LIMIT 3;
    `, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        console.log(data);
        console.table(data)
      }
  })

  // ---no_5---
  db.all(
    `SELECT first_name, last_name, gender, age
    FROM votes
    JOIN politicians
      ON politician_id = politicians.id
    JOIN voters
      ON voter_id = voters.id
    WHERE name = 'Olympia Snowe';
    `, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        console.log(data);
        console.table(data)
      }
  })
})

db.close();