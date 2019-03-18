const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./poll.db');

const politicians = fs.readFileSync('./politicians.csv', 'utf8').split('\n').slice(1).map(v => v.split(','));
const voters = fs.readFileSync('./voters.csv', 'utf8').split('\n').slice(1).map(v => v.split(','));
const votes = fs.readFileSync('./votes.csv', 'utf8').split('\n').slice(1).map(v=> v.split(','));

db.serialize(function() {
  const politicianStmt = db.prepare(`INSERT INTO politicians VALUES(null, ?, ?, ? ,?)`);
    for(let i = 0; i<politicians.length; i++){
      politicianStmt.run(`${politicians[i][0]}`, `${politicians[i][1]}`, `${politicians[i][2]}`, `${politicians[i][3]}`, function(err){
        if(err) {
          console.log(err)
        }
      });
    }
    politicianStmt.finalize(function(err){
      if(err){
        console.log(err);
      } else {console.log('successfully seeded politicians table')}
    });
})

db.serialize(function() {
  const voterStmt = db.prepare(`INSERT INTO voters VALUES(null, ?, ?, ? ,?)`);
    for(let i = 0; i<voters.length; i++){
      voterStmt.run(`${voters[i][0]}`, `${voters[i][1]}`, `${voters[i][2]}`, `${voters[i][3]}`, function(err){
        if(err) {
          console.log(err)
        }
      });
    }
    voterStmt.finalize(function(err){
      if(err) {
        console.log('error', err)
      } else {console.log('successfully seeded voters table')}
    });
})

db.serialize(function() {
  const votesStmt = db.prepare(`INSERT INTO votes VALUES(null, ?, ?)`);
    for(let i = 0; i<votes.length; i++){
      votesStmt.run(`${votes[i][0]}`, `${votes[i][1]}`, function(err){
        if(err) {
          console.log(err)
        }
      });
    }
    votesStmt.finalize(function(err){
      if(err) {
        console.log(err);
      } else {console.log('successfully seeded votes table');}
    });
})