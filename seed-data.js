const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./voters.db')
const fs = require('fs')
const voters = fs.readFileSync('./voters.csv', 'utf8').split('\n')
const votes = fs.readFileSync('./votes.csv', 'utf8').split('\n')
const politicians = fs.readFileSync('./politicians.csv', 'utf8').split('\n')

/* db.serialize(() => {
  let entry = `INSERT INTO voters (id, first_name, last_name, gender, age)
  VALUES (null, 'muhammad', 'yusuf', 'male', 20);`
  db.run(entry, (err) => {
    if(err) console.log('error')
    else console.log('Sukses!')
  })
}) */

db.serialize(() => {
  // console.log(voter)
  let entry = db.prepare(`INSERT INTO voters VALUES (null, ?, ?, ?, ?)`)
  for(let i = 1; i < voters.length; i++) {
    let voter = voters[i].split(',')
    entry.run(voter[0], voter[1], voter[2], voter[3])
  }
  entry.finalize((err) => {
    if(err) console.log('Error Finalizing voters')
    else console.log('voters done!')
  })

  // console.log(politicians) -> name, party, location, grade_current
  entry = db.prepare(`INSERT INTO politicians VALUES (null, ?, ?, ?, ?)`)
  for(let i = 1; i < politicians.length; i++) {
    let politician = politicians[i].split(',')
    entry.run(politician[0], politician[1], politician[2], politician[3])
  }
  entry.finalize((err) => {
    if(err) console.log('Error Finalizing politicians')
    else console.log('politicians done!')
  })

  // console.log(votes) -> voterId, politicianId
  entry = db.prepare(`INSERT INTO votes VALUES (null, ?, ?)`)
  for(let i = 1; i < votes.length; i++) {
    let vote = votes[i].split(',')
    entry.run(vote[0], vote[1])
  }
  entry.finalize((err) => {
    if(err) console.log('Error Finalizing votes')
    else console.log('votes done!')
  })
})

db.close()