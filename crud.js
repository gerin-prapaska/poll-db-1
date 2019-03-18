const db = require('./configdb')

// console.log(db)

// CRUD All

const create = (table_name, obj) => {
  let keys = Object.keys(obj)
  let values = Object.values(obj)
  // console.log(keys)
  console.log(values)
  const query = `INSERT INTO ${table_name}
                VALUES (null, ${keys.map(key => '?')})
  `
  db.run(query, values, function(err) {
    if(err) {
      console.log('Error')
    } else {
      console.log(`Succesfully added ${values[0]} into database: ${table_name}`)
    }
  })
}

// Turn this on when you want to add new politician into database
// create('Politicians', {
//   'name' : 'Yoga Permana',
//   'party' : 'R',
//   'location' : 'NY',
//   'grade_current' : 1.691993839
// })

// Turn this on when you want to add new Voter into database
// create('Voters', {
//   'first_name' : 'Martin Suhendra',
//   'last_name' : 'Suhendra',
//   'gender' : 'male',
//   'age' : 23
// })


const findAll = (table_name) => {
  // console.log(table_name)
  const query = `SELECT * FROM ${table_name}`
  // console.log(query)
  db.all(query, [], (err, rows) => {
    if(err) {
      console.log(err)
    } else {
      rows.forEach(data => console.log(data))
    }
  })
}

// You need to choose which table you want to read by turning it on one by one eg: Politicians
// findAll('Politicians')
// // findAll('Voters')
// // findAll('Votes')

const findOne = (table_name, field, value) => {

  const query = `SELECT * FROM ${table_name}
                WHERE ${field} = ?`
  db.get(query, [value], (err, data) => {
    if(err) {
      console.log(err.message)
    } else {
      console.log(`This is the result of your Query:\n${Object.values(data)}`)
    }
  })
}

// findOne('Politicians', 'id', 1)

// You need to choose which table you want to read by turning it on one by one eg: Politicians

const update = (table_name, obj) => {

  let query = `UPDATE ${table_name}
              SET ${obj.updatedField} = ?
              WHERE ${obj.whereField} = ?`
              console.log(query)

  db.run(query, [obj.updateValue, obj.whereValue], function(err) {
    if(err) {
      console.log(err.message)
    } else {
      console.log(`Successfully updated column '${obj.updatedField}', where '${obj.whereField}' = ${obj.whereValue} to ${obj.updateValue}`)
    }
  })
}


// // Misalnya kita mau update data politician di id 15  
// update('Politicians', {
//   'whereField' : 'id',
//   'whereValue' : 1,
//   'updatedField': 'name',
//   'updateValue': 'Reyhan Huditama'
// })

const deleteData = (table_name, field, value) => {

  let query = `DELETE FROM ${table_name}
              WHERE ${field} = ?`

  db.run(query, [value], function (err) {
    if(err) {
      console.log(err.message)
    } else {
      if(this.changes === 0) {
        console.log('There is no data')
      } else {
        // console.log('===', this)
        console.log(`You have successfully deleted data index ${value} from table ${table_name}`)
      }
    }
  })
}

// deleteData('Politicians', 'id', 3)

