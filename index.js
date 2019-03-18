const [command, ...args] = process.argv.slice(2)
const db = require("./db")

function create(tableName, option) {
  let createQuery = ""
  if (tableName === "Politicians" || tableName === "Voters") {
    createQuery = `INSERT INTO ${tableName} VALUES (null, ?, ?, ?, ?)`
  }
  else if (tableName === "Votes") {
    createQuery = `INSERT INTO ${tableName} VALUES (null, ?, ?)`
  }

  db.run(createQuery, option, err => {
    if (err) {
      console.log(err.message);
    }
    else {
      console.log(`Berhasil menambahkan data ke ${tableName}`);
    }
  })
}

function update(tableName, option) {
  const [condVal, updField, updVal] = option
  updateQuery = `UPDATE ${tableName} SET ${updField} = ? WHERE id = ?`

  db.run(updateQuery, [updVal, condVal], err => {
    if (err) {
      console.log(err.message);
    }
    else {
      console.log(`Berhasil mengupdate data dengan id ${condVal}`);
    }
  })
}

function remove(tableName, id) {
  deleteQuery = `DELETE FROM ${tableName} WHERE id = ?`

  db.run(deleteQuery, id, err => {
    if (err) {
      console.log(err.message);
    }
    else {
      console.log(`Berhasil menghapus data dengan id ${id}`);
    }
  })
}

switch(command) {
  case "add": {
    switch(args[0]) {
      case "politician": {create("Politicians", args.slice(1))} break;
      case "voter": {create("Voters", args.slice(1))} break;
      case "vote": {create("Votes", args.slice(1))} break;
    } break;
  }

  case "update": {
    switch(args[0]) {
      case "politician": {update("Politicians", args.slice(1))} break;
      case "voter": {update("Voters", args.slice(1))} break;
      case "vote": {update("Votes", args.slice(1))} break;
    } break;
  }

  case "delete": {
    switch(args[0]) {
      case "politician": {remove("Politicians", args[1])} break;
      case "voter": {remove("Voters", args[1])} break;
      case "vote": {remove("Votes", args[1])} break;
    } break;
  }
}