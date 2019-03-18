const db = require('./configdb')
const fs = require('fs')

// ----- First Seeding Method -----
// db.serialize(() => {

//   let politicianDatas = fs.readFileSync('./politicians.csv', 'utf8').split('\n').map(e => e.split(','))
//   // console.log(politicianDatas)

//   let votersData = fs.readFileSync('./voters.csv', 'utf8').split('\n').map(e => e.split(','))
//   // console.log(votersData)

//   let votesData = fs.readFileSync('./votes.csv', 'utf8').split('\n').map(e => e.split(','))
//   console.log(votesData)

//   // politicianDatas.forEach(e => {
//   //   // console.log(e)
//   //   db.run(`INSERT INTO Politicians(name, party, location, grade_current)
//   //           VALUES("${e[0]}", "${e[1]}", "${e[2]}", "${e[3]}")
//   //   )`)
//   // })

//   for(let i = 1; i < politicianDatas.length; i++) {
//     // console.log(politicians[1])
//     db.run(`INSERT INTO Politicians(name, party, location, grade_current)
//     VALUES("${politicianDatas[i][0]}", "${politicianDatas[i][1]}", "${politicianDatas[i][2]}", "${politicianDatas[i][3]}"
//     )`)
//   }

//   for(let i = 1; i < votersData.length; i++) {
//     // console.log(politicians[1])
//     db.run(`INSERT INTO Voters(first_name, last_name, gender, age)
//     VALUES("${votersData[i][0]}", "${votersData[i][1]}", "${votersData[i][2]}", "${votersData[i][3]}"
//     )`)
//   }

//   for(let i = 1; i < votesData.length; i++) {
//     // console.log(politicians[1])
//     db.run(`INSERT INTO Votes(voterId, politicianId)
//     VALUES("${votesData[i][0]}", "${votesData[i][1]}"
//     )`)
//   }
// })




// ----- 2nd Seeding Method ----
// let seedData = (file_name, table_name) => {
//   // console.log(file_name, table_name)

//   let parsedData = fs.readFileSync(file_name, 'utf8').split('\n').map(e => e.split(','))
//   // console.log(parsedData)
//   // console.log(parsedData[0])
//   // let test = parsedData[0].map(e => '?')
//   // let test = parsedData[0].map(e => e)
//   // console.log(test)

//   for(let i = 1; i < parsedData.length; i++) {

//     let query = `INSERT INTO ${table_name}(${parsedData[0].join(',')})
//                 VALUES(${parsedData[i].map(e => '?')})`
//                 console.log(query)
//     db.run(query,parsedData[i] ,(err) => {
//       if(err) {
//         console.log(err.message)
//       } else {
//         console.log(`Successfully parsed data from ${file_name} into database ${table_name}`)
//       }
//     })
//   }
// }

// db.serialize(() => {
//   seedData('./politicians.csv', 'Politicians')
//   seedData('./voters.csv', 'Voters')
//   seedData('./votes.csv', 'Votes')
// })

// Seeding Using Prepare

let seedData = (file_name, table_name) => {

  let parsedData = fs.readFileSync(file_name, 'utf8').split('\n').map(e => e.split(','))
  console.log(parsedData[0])
  console.log(parsedData.length - 1)

  let query = `INSERT INTO ${table_name} VALUES (null, ${parsedData[0].map(e => '?')})`
  let stmt = db.prepare(query)
  for(let i = 1; i < parsedData.length; i++) {
    stmt.run(parsedData[i].map(e => e))
  }
  stmt.finalize((err) => {
    if(err) {
      console.log(err.message)
    } else {
      console.log('Successfull Seeding !!!')
    }
  });
}

seedData('./politicians.csv', 'Politicians')
seedData('./voters.csv', 'Voters')
seedData('./votes.csv', 'Votes')