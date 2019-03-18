const db = require('./configdb')

// Find Politician with Party R and grade_current range between 9 - 11
function stage1() {
  let query = `SELECT name, party, grade_current FROM Politicians
  WHERE grade_current > 9 AND grade_current < 11 AND party = "R"`
  ;
  // console.log(query)

  db.all(query, (err, data) => {
    if(err) {
      console.log(err)
    } else {
      console.log(data)
    }
  })
}

// stage1()

function stage2() {
  let query = `SELECT COUNT(*) AS totalVote, Politicians.name
              FROM Votes
              JOIN Politicians
              ON Votes.politicianId = Politicians.id
              WHERE Politicians.name = 'Olympia Snowe'`
  db.all(query, (err, data) => {
    if(err) {
      console.log(err)
    } else {
      console.log(data)
    }
  })
}

// stage2()

function stage3() {
  let query = `SELECT Politicians.name, COUNT(*)
              FROM Politicians
              JOIN Votes
              ON Politicians.id = Votes.politicianId
              WHERE name LIKE 'Adam%'
              GROUP by Votes.politicianId;`
  db.all(query, (err, data) => {
    if(err) {
      console.log(err) 
    } else {
      console.log(data)
    }
  })
}

// stage3()

function stage4() {
  let query = `SELECT COUNT(*) as totalVote, Politicians.name, Politicians.party, Politicians.location
              FROM Politicians
              JOIN Votes
              ON Politicians.id = Votes.politicianId
              GROUP by Votes.politicianId
              ORDER BY totalVote DESC
              LIMIT 3;`
  db.all(query, (err, data) => {
    if(err) {
      console.log(err.message)
    } else {
      console.log(data)
    }
  })
}
// stage4()

function stage5() {
  let query = `SELECT Voters.first_name, Voters.last_name, Voters.gender, Voters.age 
              FROM Voters
              JOIN Votes
              ON Voters.Id = Votes.voterId
              JOIN Politicians
              ON Votes.politicianId = Politicians.id
              WHERE Politicians.name = 'Olympia Snowe'`
  db.all(query, (err, data) => {
    if(err) {
      console.log(err.message)
    } else {
      console.log(data)
    }
  })
}
stage5()

