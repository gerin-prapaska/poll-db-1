const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('database.db')

//QUESTION 1
function question1() {
    let query1 = `SELECT name, party, grade_current
                  FROM politicians
                  WHERE party = 'R'
                  AND grade_current BETWEEN 9 AND 11`
    db.all(query1, function (err, allData) { (err) ? console.log(err.message) : console.log(allData) })
}
question1()

//QUESTION 2
function question2() {
    let query2 = `SELECT COUNT (*) as totalVotes, name
                  FROM politicians 
                  JOIN votes 
                    ON politicians.id = votes.politicianId
                  WHERE name = 'Olympia Snowe'`
    db.all(query2, function (err, allData) { (err) ? console.log(err.message) : console.log(allData) })
}
question2()

//QUESTION 3
function question3() {
    let query3 = `SELECT name, COUNT(*) as totalVotes
                  FROM politicians
                  JOIN votes 
                    ON politicians.id = votes.politicianId
                  WHERE name LIKE "%Adam%"
                  GROUP BY name`
    db.all(query3, function (err, allData) { (err) ? console.log(err.message) : console.log(allData) })
}
question3()

//QUESTION 4
function question4() {
    let query4 = `SELECT COUNT(*) as totalVotes, name, party, location
                  FROM politicians
                  JOIN votes 
                    ON politicians.id = votes.politicianId
                  GROUP BY politicians.id
                  ORDER BY totalVotes desc
                  LIMIT 3`
    db.all(query4, function (err, allData) { (err) ? console.log(err.message) : console.log(allData) })
}
question4()

//QUESTION 5
function question5() {
    let query5 = `SELECT first_name, last_name, gender, age
                  FROM voters
                  JOIN votes
                    ON voters.id = votes.voterId
                  WHERE politicianId = (SELECT id 
                                        FROM politicians
                                        WHERE name = "Olympia Snowe")`
    db.all(query5, function (err, allData) { (err) ? console.log(err.message) : console.log(allData) })
}
question5()