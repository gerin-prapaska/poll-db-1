const fs = require("fs")
const db = require("./db")

let politicians = fs.readFileSync("./politicians.csv", "utf8").split("\n").slice(1).filter(politician => politician !== "").map(politician => politician.split(","))
let voters = fs.readFileSync("./voters.csv", "utf8").split("\n").slice(1).filter(voter => voter !== "").map(voter => voter.split(","))
let votes = fs.readFileSync("./votes.csv", "utf8").split("\n").slice(1).filter(vote => vote !== "").map(vote => vote.split(","))

let seedPoliticianQuery =
`INSERT INTO Politicians (name, party, location, grade_current) VALUES (?, ?, ?, ?)`

let seedVotersQuery =
`INSERT INTO Voters (first_name, last_name, gender, age) VALUES (?, ?, ?, ?)`

let seedVotesQuery =
`INSERT INTO Votes (voterId, politicianId) VALUES (?, ?)`

db.serialize(() => {
  politicians.forEach(politician => {
    db.run(seedPoliticianQuery, politician, err => {
      if (err) {
        console.log(err.message);
      }
      else {
        console.log(`${politician[0]}: DONE`);
      }
    })
  })

  voters.forEach(voter => {
    db.run(seedVotersQuery, voter, err => {
      if (err) {
        console.log(err.message);
      }
      else {
        console.log(`${voter[0]}: DONE`);
      }
    })
  })

  votes.forEach(vote => {
    db.run(seedVotesQuery, vote, err => {
      if (err) {
        console.log(err.message);
      }
      else {
        console.log(`${vote}: DONE`);
      }
    })
  })
})