// RELEASE 3 queries
const db = require("./db")
const partyRWithGradeCurrent =
`SELECT name, party, grade_current
FROM Politicians
WHERE grade_current BETWEEN 9 AND 11;`

const olympiaSnoweVoteCountQuery =
`SELECT COUNT(PoliticianId) AS totalVote, Politicians.name
FROM Votes
JOIN Politicians
ON Politicianid = Politicians.id
WHERE Politicians.name = "Olympia Snowe";`

const theAdamsQuery =
`SELECT name, COUNT(Votes.PoliticianId) AS totalVote
FROM Politicians
JOIN Votes
WHERE name LIKE "%Adam%"
GROUP BY Politicians.id;`

const topThreeVotesQuery =
`SELECT COUNT(Votes.PoliticianId) AS totalVotes, name, party, location
FROM Politicians
JOIN Votes
ON Politicians.id = Votes.PoliticianId
GROUP BY Politicians.id
ORDER BY totalVotes DESC
LIMIT 3`

const whoVotedOlympiaSnowee =
`SELECT first_name, last_name, gender, age
FROM Voters
JOIN Votes
ON Voters.id = Votes.VoterId
WHERE Votes.PoliticianId = (SELECT Politicians.id
FROM Politicians
JOIN Votes
ON Politicians.id = Votes.PoliticianId
WHERE Politicians.name = "Olympia Snowe"
GROUP BY Politicians.name)`

function dbAllQuery(query, callback) {
  db.all(query, (err, rows) => {
    if (err) {
      callback(err, null)
    }
    else {
      callback(null, rows);
    }
  })
}

db.serialize(() => {
  dbAllQuery(partyRWithGradeCurrent, (err, rows) => {
    err ? console.log(err) : console.log(rows);
  })

  dbAllQuery(olympiaSnoweVoteCountQuery, (err, row) => {
    err ? console.log(err) : console.log(row);
  })

  dbAllQuery(theAdamsQuery, (err, rows) => {
    err ? console.log(err) : console.log(rows);
  })

  dbAllQuery(topThreeVotesQuery, (err, rows) => {
    err ? console.log(err) : console.log(rows);
  })

  dbAllQuery(whoVotedOlympiaSnowee, (err, rows) => {
    err ? console.log(err) : console.log(rows);
  })
})
