const db = require('./db');

function insertData(table, data) {
  for (let i = 0; i < data.length; i++) {
    if (data[i] == Number(data[i])) {
      data[i] = Number(data[i]);
    }
  }

  let query = `INSERT INTO ${table}
  VALUES (null`
  for (let i = 0; i < data.length; i++) {
    query += `, ?`
  }
  query += `);`
  
  let entry = db.prepare(query);

  entry.run(data);
  
  entry.finalize((err) => {
    if (err) {
      console.log(err);
    } else {
      console.log(`Successfully inserting ${table}!`);
    }
  })
}

function updateData(table, set, value, where) {
  db.run(`UPDATE ${table}
  SET ${set} = ${value==Number(value) && Number(value) || `'${value}'`}
  WHERE id = ${Number(where)};`
  , (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log(`Successfully updating ${table}!`);
    }
  })
}

function deleteData(table, where) {
  db.run(
    `DELETE FROM ${table}
    WHERE id = ${Number(where)};`
  , (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log(`Successfully deleting ${table}!`);
    }
  })
}


module.exports = {
  insertData,
  updateData,
  deleteData
}