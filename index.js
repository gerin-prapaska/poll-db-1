const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('database.db')

const create = (tableName, value) => {
  let dynamicValue = Array.from({length: value.length+1}, (v, i) => i === 0 ? 'null' : '?').join(', ')

  let query = `INSERT INTO ${tableName}
              VALUES
              (${dynamicValue})`

  db.run(query, value, (err) => {
    if (err) console.log(err.message)
    else console.log(`berhasil menambahkan data di table ${tableName}`)
  })
}

const update = (tableName, field, value, id) => {
  let dynamicValue = Array.from(field, (v) => v + ' = ?').join(', ')

  let query = `UPDATE ${tableName}
              SET ${dynamicValue}
              WHERE ${tableName}.id = ${id}`

    db.run(query, value, err => {
      if (err) console.log(err.message)
      else console.log('berhasil update')
    })
}

const deleteData = (tableName, id) => {
  let query = `DELETE FROM ${tableName}
              WHERE ${tableName}.id = ${id}`

  db.run(query, (err) => {
    if (err) console.log(err)
    else console.log('berhasil menghapus data')
  })
}

// create('Politicians', ['Azhar', 'M', 'DK', '19.64634133'])
// update('Politicians', ['name', 'party', 'location', 'grade_current'], ['Wika Silo', 'G', 'US', '19.5362423'], 22)
// deleteData('Politicians', 22)

let query1 = `SELECT name, party, grade_current
              FROM Politicians
              WHERE Politicians.party = 'R'
              AND Politicians.grade_current BETWEEN 9 AND 11`

// db.all(query1, (err, rows) => {
//   if (err) console.log(err.message)
//   else console.log(rows)
// })

let query2 = `SELECT COUNT(*) as totalVote, name
              FROM Politicians
              LEFT JOIN Votes
              ON Politicians.id = Votes.politicianId
              WHERE Politicians.name = 'Olympia Snowe'`

// db.all(query2, (err, rows) => {
//   if (err) console.log(err.message)
//   else console.log(rows)
// })

let query3 = `SELECT COUNT(*) as totalVote, name
              FROM Politicians
              LEFT JOIN Votes
              ON Politicians.id = Votes.politicianId
              WHERE Politicians.name LIKE 'Adam%'
              GROUP BY Politicians.name `

// db.all(query3, (err, rows) => {
//   if (err) console.log(err.message)
//   else console.log(rows)
// })

let query4 = `SELECT COUNT(*) as totalVote, name, party, location
             FROM Politicians
             LEFT JOIN Votes
             ON Politicians.id = Votes.politicianId
             GROUP BY name
             ORDER BY totalVote DESC
             LIMIT 3`

// db.all(query4, (err, rows) => {
//   if (err) console.log(err.message)
//   else console.log(rows)
// })

let query5 = `SELECT first_name, last_name, gender, age
              FROM Votes
              JOIN Voters
              ON Votes.voterId = Voters.id
              JOIN Politicians
              ON Politicians.id = Votes.politicianId
              WHERE Politicians.name = 'Olympia Snowe'`

db.all(query5, (err, rows) => {
  if (err) console.log(err);
  else console.log(rows);
})

// # poll-db-2

// >QUERY 1

// ```SQL
// SELECT name, location, grade_current, COUNT(*) as totalVotes
// FROM Politicians
// JOIN Votes
// WHERE Politicians.id = Votes.politicianId
// AND grade_current < 9
// GROUP BY name
// ORDER BY Politicians.grade_current ASC
// ```

// >Query 2

// ```SQL
// SELECT totalVotes, (first_name || ' ' || last_name) as Fullname, gender, age, subquery.name
// FROM Voters
// JOIN Votes ON Voters.id = Votes.voterId
// JOIN (SELECT COUNT(Politicians.name) AS totalVotes, Politicians.id, Politicians.name 
// FROM Politicians
// JOIN Votes
// ON Politicians.id = Votes.politicianId
// GROUP BY Politicians.name
// ORDER BY totalVotes DESC
// LIMIT 3) as subquery
// ON Votes.politicianId = subquery.id
// ORDER BY totalVotes DESC, name ASC
// ```

// >Query 3
// ```SQL
// SELECT COUNT(*) as totalVote, (first_name || ' ' || last_name) as name, gender, age
// FROM Voters
// JOIN Votes ON Votes.voterId = Voters.id
// GROUP BY name
// ORDER BY totalVote desc
// ```