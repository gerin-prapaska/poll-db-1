const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./voters.db')
const fs = require('fs')
const voters = fs.readFileSync('./voters.csv', 'utf8').split('\n')
const votes = fs.readFileSync('./votes.csv', 'utf8').split('\n')
const politicians = fs.readFileSync('./politicians.csv', 'utf8').split('\n')


db.serialize(() => {
  let table = 'voters'

  // /* create */
  // let ucup = 'Muhammad,Yusuf,male,25'
  // ucup = ucup.split(',')
  // db.run(`INSERT INTO ${table} VALUES (null, '${ucup[0]}', '${ucup[1]}', '${ucup[2]}', ${ucup[3]});`, (err) => {
  //   if(err) console.log(`Error inserting to ${table}`)
  //   else console.log(`Insertion to table ${table} successful!`)
  // })

  // /* update */
  // let update = 'last_name,Smith,id,151'
  // update = update.split(',')
  // if(update[1] === Number(update[1])) {
  //   db.run(`UPDATE ${table} SET ${update[0]} = ${update[1]} WHERE ${update[2]} = ${update[3]}`, (err) => {
  //     if(err) console.log(`Error updating1`)
  //     else console.log(`Update success!`)
  //   })
  // } else {
  //   db.run(`UPDATE ${table} SET ${update[0]} = '${update[1]}' WHERE ${update[2]} = ${update[3]}`, (err) => {
  //     if(err) console.log(`Error updating2`)
  //     else console.log(`Update success!`)
  //   })
  // }

  // /* delete */
  let deletion = 'id,151'
  deletion = deletion.split(',')
  db.run(`DELETE FROM ${table} WHERE ${deletion[0]} = ${deletion[1]}`, (err) => {
    if(err) console.log(`Error during deletion!`)
    else console.log(`Successfully deleted ${deletion[0]} ${deletion[1]} from table ${table}`)
  })
})
db.close()