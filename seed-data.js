const fs = require('fs')
const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('database.db')

let politicians = fs.readFileSync('./politicians.csv', 'utf8').split('\n').slice(1).map(el => el.split(','))
let politiciansVal = Array.from({length: politicians[0].length}, () => '?')
politiciansVal.unshift('null')
let valuePoliticians = `(${politiciansVal.join(', ')})`

let voters = fs.readFileSync('./voters.csv', 'utf8').split('\n').slice(1).map(el => el.split(','))
let votersVal = Array.from({length: voters[0].length}, () => '?')
votersVal.unshift('null')
let valueVoters = `(${votersVal.join(', ')})`

let votes = fs.readFileSync('./votes.csv', 'utf8').split('\n').slice(1).map(el => el.split(','))
let votesVal = Array.from({length: votes[0].length}, () => '?')
votesVal.unshift('null')
let valueVotes = `(${votesVal.join(', ')})`

db.serialize(() => {
  let seedPoliticians = db.prepare(`INSERT INTO Politicians VALUES ${valuePoliticians}`);
  politicians.forEach(el => {
    seedPoliticians.run(...el)
  })
  seedPoliticians.finalize()

  let seedVoters = db.prepare(`INSERT INTO Voters VALUES ${valueVoters}`);
  voters.forEach(el => {
    seedVoters.run(...el)
  })
  seedVoters.finalize()

  let seedVotes = db.prepare(`INSERT INTO Votes Values ${valueVotes}`);
  votes.forEach(el => {
    seedVotes.run(...el)
  })
  seedVotes.finalize()
})
 