const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./database.db');

let query =  function(data){
    let statement  = data
    db.all(statement,function (err,rows) {
        if (err) {
            console.log(err)
        } else {
            console.log(rows)
        }
    })
}

//1
query(`SELECT * FROM politicians WHERE party = "R" AND grade_current >9 AND grade_current < 11 ;`)

//2
query(`
SELECT COUNT (*) AS totalVote, name FROM politicians JOIN votes
ON votes.politicianId = politicians.id
WHERE name = 'Olympia Snowe';"`)

//3
query(`
SELECT name, COUNT(*) AS totalVote FROM votes JOIN politicians 
ON votes.politicianId = politicians.id
WHERE name LIKE '%Adam%';`)

//4
query(`
SELECT COUNT (*) AS totalVote, name , party, location FROM politicians
JOIN votes ON politicians.id = votes.politicianId
GROUP BY politicians.name
ORDER BY totalVote DESC
LIMIT 3;`)

//5
query(`
SELECT first_name,last_name,gender,age 
FROM politicians 
JOIN voters
ON voters.id = votes.voterId
JOIN votes
ON politicians.id= votes.politicianId
WHERE politicians.name = 'Olympia Snowe';`)