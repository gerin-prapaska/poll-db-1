const db = require('./Database/db')
const readData = require('./readData')

db.serialize(() => {
  const politicians = readData.findAll('politicians.csv').slice(1)
  politicians.forEach(file => {
    db.run(`INSERT INTO politicians (name, party, location, grade_current) VALUES ("${file[0]}", "${file[1]}", "${file[2]}", "${file[3]}")`, (err) => {
      if(err) {
        console.log(err)
      } else {
        console.log('Inserted Politicians Success')
      }
    })
  })

  const voters = readData.findAll('voters.csv').slice(1)
  voters.forEach(fileVoter => {
    db.run(`INSERT INTO voters (first_name, last_name, gender, age) VALUES ("${fileVoter[0]}", "${fileVoter[1]}", "${fileVoter[2]}", "${fileVoter[3]}")`, (err) => {
      if(err) {
        console.log(err)
      } else {
        console.log('Inserted Voters Success')
      }
    })
  })

  const votes = readData.findAll('votes.csv').slice(1)
  votes.forEach(fileVotes => {
    db.run(`INSERT INTO votes (voterId,politicianId) VALUES ("${fileVotes[0]}", "${fileVotes[1]}")`, (err) => {
      if(err) {
        console.log(err)
      } else {
        console.log('Inserted Votes Success')
      }
    })
  })
})
