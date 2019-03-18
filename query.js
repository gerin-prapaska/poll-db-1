const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./poll.db');

query1 = `SELECT * FROM politicians WHERE grade_current BETWEEN 9 and 11`;
query2 = `SELECT count(*) as totalVotes, name FROM politicians JOIN votes on politicians.id = votes.politicianId WHERE votes.politicianId = 17`;
query3 = `SELECT count(*) as totalVotes, name FROM politicians CROSS JOIN votes on politicians.id = votes.politicianId WHERE name LIKE '%Adam%' group by name`;
query4 = `SELECT count(*) as totalVotes, name, party, location FROM politicians CROSS JOIN votes ON politicians.id = votes.politicianId GROUP BY votes.politicianId ORDER BY totalVotes desc LIMIT 3 `;
query5 = ``
// db.all(query1, (err, rows) => {
//   if(err) {
//     console.log(err)
//   } else {
//     console.table(rows);
//   }
// })

// db.all(query2, (err, rows) => {
//   if(err) {
//     console.log(err)
//   } else {
//     console.log(rows);
//   }
// })

// db.each(query3, (err, rows) => {
//   if(err) {
//     console.log(err)
//   } else {
//     console.log(rows);
//   }
// })

// db.each(query4, (err, rows) => {
//   if(err) {
//     console.log(err)
//   } else {
//     console.log(rows);
//   }
// })

db.each(query5, (err, rows) => {
  if(err) {
    console.log(err)
  } else {
    console.log(rows);
  }
})
