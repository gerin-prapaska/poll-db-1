const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./poll.db');

query1 = `SELECT * FROM politicians WHERE grade_current BETWEEN 9 AND 11`;
query2 = `SELECT count(*) as totalVotes, name FROM politicians JOIN votes on politicians.id = votes.politicianId WHERE votes.politicianId = 17`;
query3 = `SELECT count(*) as totalVotes, name FROM politicians 
          CROSS JOIN votes on politicians.id = votes.politicianId 
          WHERE name LIKE '%Adam%' GROUP BY name`;
query4 = `SELECT count(*) as totalVotes, name, party, location FROM politicians 
          CROSS JOIN votes ON politicians.id = votes.politicianId 
          GROUP BY votes.politicianId ORDER BY totalVotes desc LIMIT 3 `;
query5 = `WITH previous_query AS (SELECT * FROM politicians JOIN votes ON politicians.id = votes.politicianId 
          WHERE votes.politicianId = 17) SELECT first_name, last_name, gender, age 
          FROM voters JOIN previous_query ON previous_query.voterId = voters.id`;

db.all(query1, (err, rows) => {
  if(err) {
    console.log(err)
  } else {
    console.table(rows);
  }
})

db.all(query2, (err, rows) => {
  if(err) {
    console.log(err)
  } else {
    console.table(rows);
  }
})

db.all(query3, (err, rows) => {
  if(err) {
    console.log(err)
  } else {
    console.table(rows);
  }
})

db.all(query4, (err, rows) => {
  if(err) {
    console.log(err)
  } else {
    console.table(rows);
  }
})

db.all(query5, (err, rows) => {
  if(err) {
    console.log(err)
  } else {
    console.table(rows);
  }
})
