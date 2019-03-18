const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./voters.db')
const argv = process.argv.slice(2)

switch(argv[0]){
  case 'insert': insert(argv[1], argv.slice(2)); break
  case 'update': update(argv[1], argv.slice(2)); break
  case 'delete': deleteion(argv[1], argv.slice(2)); break
  default: break
}

/* create */
function insert(table, input) {
  let length = 0
  if(table === 'voters' || table === 'politicians') {
    length = 4
    if(table === 'politicians' && input.length === 5) {
      input[1] = `${input[0]} ${input[1]}`
      input.shift()
    }
  }
  else {length = 2}
  if(input.length < length) {
    console.log('Panjang data invalid')
  }
  let entry = `INSERT INTO ${table} VALUES (null`
  for(let i = 0; i < input.length; i++) {
    if(input[i] == Number(input[i])) {
      entry += `,${input[i]}`
    } else {
      entry += `,'${input[i]}'`
    }
  }
  entry += ');'
  // console.log(entry)
  db.serialize(()=> {
    db.run(entry, (err) => {
      if(err) console.log('Error')
      else console.log(`Berhasil memasukkan data ke tabel ${table}.`)
    })
  })
  db.close()
}

/* update */
function update(table, input) {
  if(input.length < 4) {
    console.log('Input isn\'t long enough')
  }
  if(table === 'politicians' && input[0] === 'name' && input[3] === 'id') {
    input[2] = `${input[1]} ${input[2]}`
    input[1] = input[0]
    input.shift()
  }
  db.run(`UPDATE ${table} SET ${input[0]} = ? WHERE ${input[2]} = ${input[3]}`, input[1], (err) => {
    if(err) console.log(`Error!`)
    else console.log(`Updated!`)
  })
}

/* delete */
function deleteion(table, input) {
  db.run(`DELETE FROM ${table} WHERE ${input[0]} = ${input[1]}`, (err) => {
    if(err) console.log(`Error during deletion!`)
    else console.log(`Successfully deleted ${input[0]} ${input[1]} from table ${table}`)
  })
}
