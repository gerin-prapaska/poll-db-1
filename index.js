const db = require('./Database/db')
const command = process.argv.slice(2)
const readData = require('./readData')

switch (command[0]) {
  case 'add':
    switch (command[1]) {
      case 'politicians':
        create(command[1], command.slice(1))    
        break;
      case 'voter':
        create(command[1], command.slice(1))    
        break;
      case 'votes':
        create(command[1], command.slice(1))    
        break;
      default:
        break;
    }
    break;
  case 'update':
    update(command.slice(1))
    break;
  case 'delete':
    deleteData(command.slice(1))
    break;
  case 'rank':
    rank(command.slice(1))
    break;
  case 'vote':
    vote(command.slice(1))
    break;
  case 'searchName':
    searchName(command.slice(1))
    break;
  case 'searchHighVote' :
    searchNameHighVote()
    break
  case 'voting_to' :
    votingTO(input)
    break
  default:
    break;
}

function create(nameTable, input) {
  if(nameTable === 'politicians') {
    let name = input[0]
    let party = input[1]
    let location = input[2]
    let grade_current = input[3]
    let query = `
      INSERT INTO "${nameTable}" VALUES (null, "${name}", "${party}", "${location}", "${grade_current}")`
    
      db.run(query, (err) => {
        if(err) {
          console.log(err)
        } else {
          console.log(`Success Add ${nameTable}`)
        }
      })
  } else if(nameTable === 'voters') {
      let first_name = input[0]
      let last_name = input[1]
      let gender = input[2]
      let age = input[3]
      let query = `
        INSERT INTO "${nameTable}" VALUES (null, "${first_name}", "${last_name}", "${gender}", "${age}")`
      
        db.run(query, (err) => {
          if(err) {
            console.log(err)
          } else {
            console.log(`Success Add ${nameTable}`)
          }
        })
  } else if(nameTable === 'votes') {
    let politicianId = input[0]
    let voterId = input[1]
    let query = `
      INSERT INTO "${nameTable}" VALUES (null, "${politicianId}", "${voterId}")`
    
      db.run(query, (err) => {
        if(err) {
          console.log(err)
        } else {
          console.log(`Success Add ${nameTable}`)
        }
      })
  }
}

function update(input) {
  let name_table = input[0]
  let update_field = input[1]
  let update_value_field = input[2]
  let last_update_field = input[3]
  let last_update_value = input[4]
  let query = `UPDATE "${name_table}" SET "${update_field}" = "${update_value_field}" WHERE "${last_update_field}" = "${last_update_value}"`

  db.run(query, (err) => {
    if(err) {
      console.log(err)
    } else {
      console.log('Succees Update Data')
    }
  })
}

function deleteData(input) {
  let name_table = input[0]
  let name_field = input[1]
  let value = input[2]
  let query = `DELETE FROM "${name_table}" WHERE "${name_field}" = "${value}"`

  db.run(query, (err) => {
    if(err) {
      console.log(err)
    } else {
      console.log('Succes Delete Data')
    }
  })
}

function rank(input) {
  let field = input[0]
  let value = input[1]
  let rangefield = input[2]
  let value_min = input[3]
  let value_max = input[4]
  let query = `SELECT name, party, grade_current FROM politicians
  WHERE "${field}" = "${value}" AND "${rangefield}" BETWEEN "${value_min}" AND "${value_max}"`

  db.all(query, (err, dataSearch) => {
    if(err) {
      console.log(err)
    } else {
      console.log(dataSearch)
    }
  })
}

function vote(input) {
  console.log(input)
  let querry = `SELECT name, count(*) as totalVote FROM votes, politicians
    WHERE votes.politicianId = politicians.id
    AND votes.politicianId IN
    (SELECT id FROM politicians WHERE name = "${input[0]}")
    GROUP BY votes.politicianId`

  db.all(querry, (err, dataVote) => {
    if(err) {
      console.log(err)
    } else {
      console.log(dataVote)
    }
  })
}

function searchName(input) {
  let querry = `SELECT name, count(*) FROM politicians
    JOIN Votes 
    ON politicians.id = votes.politicianId 
    WHERE name like "${input[0]}%"
    GROUP by politicianId`

  // console.log(querry)
  db.all(querry, (err, searchAll) => {
    if (err) {
      console.log(err)
    } else {
      console.log(searchAll)
    }
  })
}

function searchNameHighVote() {
  let querry = `SELECT count(*) AS totalVote, politicians.name, politicians.party, politicians.location FROM politicians
  JOIN votes
  ON politicians.id = votes.politicianId
  GROUP BY politicians.name
  ORDER BY totalVote DESC
  limit 3`

  db.all(querry, (err, searchHighCount) => {
    if (err) {
      console.log(err)
    } else {
      console.log(searchHighCount)
    }
  })
}

function votingTO(input) {
  let name = input[0]
  let querry = `SELECT first_name, last_name, gender, age FROM voter
  JOIN votes
  ON voter.id = votes.voterId
  JOIN politicians.name = "${name}"`

  db.all(querry, (err, searchName) => {
    if (err) {
      console.log(err)
    } else {
      console.log(searchName)
    }
  })
}