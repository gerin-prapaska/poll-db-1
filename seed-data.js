const fs = require('fs')
const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('database.db')

let politicians = fs.readFileSync('./politicians.csv', 'utf8').split('\n').slice(1).map(el => el.split(','))
let polValue = Array.from({
  length: politicians[0].length
}, () => '?')
polValue.unshift('null')
let valuePol = `(${polValue.join(', ')})`

let voters = fs.readFileSync('./voters.csv', 'utf8').split('\n').slice(1).map(el => el.split(','))
let votsValue = Array.from({
  length: voters[0].length
}, () => '?')
votsValue.unshift('null')
let valueVots = `(${votsValue.join(', ')})`

let votes = fs.readFileSync('./votes.csv', 'utf8').split('\n').slice(1).map(el => el.split(','))
let votValue = Array.from({
  length: votes[0].length
}, () => '?')
votValue.unshift('null')
let valueVot = `(${votValue.join(', ')})`

db.serialize(() => {
  let stmtPol = db.prepare(`INSERT INTO Politicians VALUES ${valuePol}`)
  politicians.forEach(el => stmtPol.run(...el))
  stmtPol.finalize()

  let votsPol = db.prepare(`INSERT INTO voters VALUES ${valueVots}`)
  voters.forEach(el => votsPol.run(...el))
  votsPol.finalize()

  let votPol = db.prepare(`INSERT INTO votes VALUES ${valueVot}`)
  votes.forEach(el => votPol.run(...el))
  votPol.finalize()
})