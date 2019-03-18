const fs = require('fs')
const db = require('./db')

// const dataPolitician = fs.readFileSync('./politicians.csv', 'utf8').split('\n').map(i => i.split(',')).slice(1)
// const dataVoters = fs.readFileSync('./voters.csv', 'utf8').split('\n').map(i => i.split(',')).slice(1)
// const dataVotes = fs.readFileSync('./votes.csv', 'utf8').split('\n').map(i => i.split(',')).slice(1)

// db.serialize((err) => {
//   dataPolitician.map(pol => {
//     db.run(`INSERT INTO Politicians (name, party, location, grade_current)
//             VALUES (${pol[0]}, ${pol[1]}, ${pol[2]}, ${pol[3]})`)
//   })

//   dataVoters.map(vot => {
//     db.run(`INSERT INTO Voters (first_name, last_name, gender, age)
//             VALUES (${vot[0]}, ${vot[1]}, ${vot[2]}, ${vot[3]})`)
//   })

//   dataVotes.map(votes => {
//     db.run(`INSERT INTO Votes (voterId, politicianId)
//             VALUES (${votes[0]}, ${votes[1]})`)
//   })
// })

// const seedData = (file, tableName) => {
//   db.serialize(() => {
//     const parseData = fs.readFileSync(file, 'utf8').split('\n').map(col => col.split(','))
//     for(let i = 1; i < parseData.length; i++) {
//       let query = `INSERT INTO ${tableName} (${parseData[0].join(',')})
//       VALUES (${parseData[i].map(i => "?")})`
//       db.run(query, parseData[i], (err) => {
//         if(err) console.log(err.message)
//         else console.log(`successfull insert to table ${tableName}`)
//       })
//     }
//   })
// }


const seedData = (file, tableName) => {
  db.serialize(() => {
    const data = fs.readFileSync(file, 'utf8').split('\n').map(col => col.split(','))
    var stmt = db.prepare(`INSERT INTO ${tableName} (${data[0].join(',')}) 
                          VALUES (${data[1].map(() => "?")})`);
  
    for (let i = 1; i < data.length; i++) {
        stmt.run(data[i]);
    }
    stmt.finalize(err => {
      (err) ? console.log(err.message) : console.log(`seeding ${file} success...`)
    });
  })

}
seedData('./politicians.csv', 'Politicians')
seedData('./voters.csv', 'Voters')
seedData('./votes.csv', 'Votes')