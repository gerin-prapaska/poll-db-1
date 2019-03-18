const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./voters.db')
const fs = require('fs')
// const voters = fs.readFileSync('./voters.csv', 'utf8').split('\n')
// const votes = fs.readFileSync('./votes.csv', 'utf8').split('\n')
// const politicians = fs.readFileSync('./politicians.csv', 'utf8').split('\n')


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
  // db.run(`UPDATE ${table} SET ${update[0]} = ? WHERE ${update[2]} = ${update[3]}`, update[1], (err) => {
  //   if(err) console.log(`Error!`)
  //   else console.log(`Updated!`)
  // })

  // /* delete */
  // let deletion = 'id,151'
  // deletion = deletion.split(',')
  // db.run(`DELETE FROM ${table} WHERE ${deletion[0]} = ${deletion[1]}`, (err) => {
  //   if(err) console.log(`Error during deletion!`)
  //   else console.log(`Successfully deleted ${deletion[0]} ${deletion[1]} from table ${table}`)
  // })

  /* read */
  // 1. nama politician, partai, grade_current dengan (partai R) && (9 <= grade_current <= 11)
  db.all(`SELECT name, party, grade_current FROM politicians WHERE party = 'R' AND grade_current BETWEEN 9 AND 11`, (err, data) => {
    if(err) console.log(`Error`)
    else console.table(data)
  })

  // 2. jumlah vote untuk politician Olympia Snowe
  db.all(`SELECT count(*) AS totalVote, politicians.name 
  FROM votes 
  JOIN politicians 
  ON votes.politicianId = politicians.id 
  WHERE politicians.name = 'Olympia Snowe'
  `, (err, data) => {
    if(err) console.log(`Error`)
    else console.table(data)
  })

  // 3. Jumlah vote untuk politician bernama 'Adam'
  db.all(`SELECT name, COUNT(*) 
  FROM politicians 
  JOIN votes 
  ON politicians.id = votes.politicianId
  WHERE name LIKE 'Adam%' 
  GROUP BY 1
  `, (err, data) => {
    if(err) console.log(`Error`)
    else console.table(data)
  })

  // 4. Tampilkan 3 politician beserta nama partai dan lokasi politician tersebut yang memiliki suara terbanyak
  db.all(`SELECT COUNT(*) AS totalValue, name, party, location FROM votes
  JOIN politicians
  ON votes.politicianId = politicians.id
  GROUP BY votes.politicianId
  ORDER BY 1 DESC
  LIMIT 3
  `, (err, data) => {
    if(err) console.log(`Error`)
    else console.table(data)
  })

  // 5. Tampilkan siapa saja yang melakukan voting ke politician Olympia Snowe
  db.all(`SELECT first_name, last_name, gender, age FROM voters
  JOIN votes
  ON voters.id = votes.voterId
  JOIN politicians
  ON politicians.id = votes.politicianId
  WHERE politicians.name = 'Olympia Snowe'
  `, (err, data) => {
    if(err) console.log(`Error`)
    else console.table(data)
  })
})
db.close()