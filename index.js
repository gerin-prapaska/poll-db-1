const sqlit3 = require('sqlite3').verbose()
const db = new sqlit3.Database('database.db')

const create = (tablename, value) => {
  let values = Array.from({
    length: value.length
  }, () => ('?'))
  values.unshift('null')
  let query = `INSERT INTO ${tablename} 
                VALUES (${values})`
  db.run(query, value, (err) => {
    if (err) {
      console.log(err.message)
    } else {
      console.log('insert data berhasil')
    }
  })
}

const read = (tablename, option) => {
  let query = `SELECT * FROM ${tablename}`
  let arr = []
  if (option) {
    query = `SELECT * FROM ${tablename}
              WHERE ${option.field} = ?`
    arr = [option.value]
  }
  db.all(query, arr, (err, data) => {
    if (err) {
      console.log(err.message)
    } else {
      console.log(data)
    }
  })
}

const update = (tablename, options) => {
  let query = `UPDATE ${tablename} 
               SET ${options.field} = ?
               WHERE ${options.field2} = ?`
  db.run(query, [options.value, options.value2], err => {
    if (err) {
      console.log(err.message)
    } else {
      console.log(`update data berhasil`)
    }
  })
}

const remove = (tableName, option) => {
  let query = `DELETE FROM ${tableName}
               WHERE ${option.field} = ?`
  db.run(query, [option.value], (err, data) => {
    if (err) {
      console.log(err.message)
    } else {
      console.log('delete data berhasil')
    }
  })
}

// create('Politicians', ['arip', 'D', 'JKT', '2'])
// read('Politicians', {
//   field: 'name',
//   value: 'arip ya'
// })
// update('Politicians', {
//   field: 'name',
//   value: 'arip ya',
//   field2: 'id',
//   value2: 22
// })
// remove('Politicians', {
//   field: 'id',
//   value: 21
// })

let queryPertama = `SELECT Politicians.name, Politicians.party, Politicians.grade_current 
                    FROM Politicians
                    WHERE Politicians.party = "R"
                    GROUP BY Politicians.id
                    HAVING Politicians.grade_current   >= 9 AND Politicians.grade_current <= 11`
let queryKedua = `SELECT  count( Politicians.name ) "totalVote", Politicians.name 
                  FROM Politicians
                  JOIN votes on votes.politicianId = Politicians.id
                  WHERE Politicians.name = "Olympia Snowe"`
            
let queryKetiga = `SELECT  Politicians.name , count( Politicians.name ) "totalVote"  
                   FROM Politicians
                   JOIN votes on votes.politicianId = Politicians.id
                   WHERE Politicians.name like "Adam%"
                   GROUP BY Politicians.name`

let queryKeempat = `SELECT count ( Politicians.name) "totalVote", Politicians.name, Politicians.party, Politicians.location 
                    FROM Politicians
                    JOIN votes on votes.politicianId = Politicians.id
                    GROUP BY Politicians.name
                    ORDER BY totalVote DESC
                    LIMIT 3
`
let queryKelima = `SELECT voters.first_name, voters.last_name, voters.gender, voters.age 
                   FROM voters
                   JOIN votes on votes.voterId = voters.id
                   JOIN Politicians on Politicians.id = votes.politicianId
                   where Politicians.name = "Olympia Snowe"`

// db.all(queryKetiga, (err, data) => {
//   if (err) {
//     console.log(err.message)
//   } else {
//     console.log(data)
//   }
// })

