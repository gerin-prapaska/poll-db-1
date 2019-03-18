const db = require('./db')

db.serialize(() => {
  let query1 = `
  SELECT name, party, grade_current
  FROM Politicians
  WHERE party = 'R' and
  grade_current BETWEEN 9 AND 11`

  db.all(query1, (err, row) => {
    (err) ? console.log(err.message) : console.log(row)
  })

  let query2 = `
  SELECT count(Votes.voterId), name
  FROM Politicians
  JOIN Votes
  ON Politicians.id = Votes.politicianId
  WHERE name = 'Olympia Snowe';`
  db.all(query2, (err, row) => {
    (err) ? console.log(err.message) : console.log(row)
  })

  let query3 = `
  SELECT name, COUNT(Votes.politicianId) totalVotes
  FROM Politicians
  JOIN Votes
  ON Politicians.id = Votes.politicianId
  WHERE name LIKE 'Adam%'
  GROUP BY Votes.politicianId;`

  db.all(query3, (err, row) => {
    (err) ? console.log(err.message) : console.log(row)
  })

  let query4 = `
  SELECT COUNT(Votes.politicianId) totalVotes, name, party, location
  FROM Politicians
  JOIN Votes
  ON Politicians.id = Votes.politicianId
  GROUP BY Votes.politicianId
  ORDER BY totalVotes DESC
  LIMIT 3`

  db.all(query4, (err, row) => {
    (err) ? console.log(err.message) : console.log(row)
  })

  let query5 = `
  SELECT Voters.first_name, Voters.last_name, Voters.gender, Voters.age
  FROM Voters
  JOIN Votes 
  ON Voters.id = Votes.voterId
  JOIN Politicians
  ON Votes.politicianId = Politicians.id
  WHERE Politicians.name = 'Olympia Snowe'`

  db.all(query5, (err, row) => {
    (err) ? console.log(err.message) : console.log(row)
  })

})