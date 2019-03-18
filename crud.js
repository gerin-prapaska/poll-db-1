const db = require('./db')

const create = (tableName, input) => {
  let keys = Object.keys(input)
  let values = Object.values(input)

  let query = `
  INSERT INTO ${tableName} (${keys})
  VALUES (${values.map(() => "?")})`

  db.run(query, values, (err) => {
    (err) ? console.log(err.message) : console.log(`${tableName} success add row`)
  })
}

const update = (tableName, field1, value1, field2, value2) => {
  let query = `
  UPDATE ${tableName}
  SET ${field1} = ?
  WHERE ${field2} = ?`

  db.run(query, [value1, value2],(err) => {
    (err) ? console.log(err.message) : console.log(`${tableName} success updated`)
  })
}

const deleteData = (tableName, field, value) => {
  let query = `
  DELETE FROM ${tableName}
  WHERE ${field} = ?`

  db.run(query, [value],(err) => {
    (err) ? console.log(err.message) : console.log(`success delete row of table ${tableName}`)
  })
}

const findAll = (tableName) => {
  let query = `
  SELECT *
  FROM ${tableName}`

  db.all(query, (err, row) => {
    (err) ? console.log(err.message) : console.log(row)
  })
}

// create('Politicians', {
//   name: 'Martin Suhendra',
//   party: 'd',
//   location: 'LA',
//   grade_current: 13.66509733
// })

// update('Politicians', 'name', 'yoga', 'id', 21)

// deleteData('Politicians', 'id', 21)

// findWhere('Politicians', 'name', 'Olympia Snowe')

// findAll('politicians')