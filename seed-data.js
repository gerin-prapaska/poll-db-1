// Muhammad Ramadhoni
// p1-w3 poll-db-1

const db = require('./db');

const fs = require('fs');
const dataPoliticians = fs.readFileSync('./politicians.csv').toString().split('\n').slice(1);
const dataVoters = fs.readFileSync('./voters.csv').toString().split('\n').slice(1);
const dataVotes = fs.readFileSync('./votes.csv').toString().split('\n').slice(1);


// seeding lines from here...

db.serialize(() => {
  // ---seeding politicians---
  let entry = db.prepare(
    `INSERT INTO politicians (id, name, party, location, grade_current)
    VALUES (null, ?, ?, ?, ?);`
  )
  for (let i = 0; i < dataPoliticians.length; i++) {
    let data = dataPoliticians[i].split(',');
    for (let j = 0; j < data.length; j++) {
      if (data[j] == Number(data[j])) {
        data[j] = Number(data[j]);
      }
    }
    entry.run(data);
  }
  entry.finalize((err) => {
    if (err) {
      console.log('=== ERROR SEEDING POLITICIANS ===');
    } else {
      console.log('Successfully seeding politicians!');
    }
  })

  // ---seeding voters---
  entry = db.prepare(
    `INSERT INTO voters (id, first_name, last_name, gender, age)
    VALUES (null, ?, ?, ?, ?);`
  )
  for (let i = 0; i < dataVoters.length; i++) {
    let data = dataVoters[i].split(',');
    for (let j = 0; j < data.length; j++) {
      if (data[j] == Number(data[j])) {
        data[j] = Number(data[j]);
      }
    }
    entry.run(data);
  }
  entry.finalize((err) => {
    if (err) {
      console.log('=== ERROR SEEDING VOTERS ===');
    } else {
      console.log('Successfully seeding voters!');
    }
  })

  // ---seeding votes---
  entry = db.prepare(
    `INSERT INTO votes (id, voter_id, politician_id)
    VALUES (null, ?, ?);`
  )
  for (let i = 0; i < dataVotes.length; i++) {
    let data = dataVotes[i].split(',');
    for (let j = 0; j < data.length; j++) {
      if (data[j] == Number(data[j])) {
        data[j] = Number(data[j]);
      }
    }
    entry.run(data);
  }
  entry.finalize((err) => {
    if (err) {
      console.log('=== ERROR SEEDING VOTES ===');
    } else {
      console.log('Successfully seeding votes!');
    }
  })

})

db.close();

// until here...