const fs       = require('fs')
const POLITICIANS_PATH = './politicians.csv'
const VOTERS_PATH = './voters.csv'
const VOTES_PATH = './votes.csv'
const db = require('./setup')

let politiciansData = fs.readFileSync(POLITICIANS_PATH, 'utf8').split('\n').map(e => e.split(',')).slice(1)
let votersData = fs.readFileSync(VOTERS_PATH, 'utf8').split('\n').map(e => e.split(',')).slice(1)
let votesData = fs.readFileSync(VOTES_PATH, 'utf8').split('\n').map(e => e.split(',')).slice(1)
let temp = []
let politicians = []
let voters = []
let votes = []


for (let i = 0; i < politiciansData.length; i++) {
  temp=[]
  for (let j = 0; j < politiciansData[i].length; j++) {
    if(j===politiciansData[i].length-1) {
      temp.push(Number(politiciansData[i][j]))
    }else{
      temp.push(politiciansData[i][j])
    }
  }  
  politicians.push(temp)
  temp=[]
}

for (let i = 0; i < votersData.length; i++) {
  temp=[]
  for (let j = 0; j < votersData[i].length; j++) {
    if(j===votersData[i].length-1) {
      temp.push(Number(votersData[i][j]))
    }else{
      temp.push(votersData[i][j])
    }
  }  
  voters.push(temp)
  temp=[]
}

for (let i = 0; i < votesData.length; i++) {
  temp=[]
  for (let j = 0; j < votesData[i].length; j++) {
    temp.push(Number(votesData[i][j]))
  }  
  votes.push(temp)
  temp=[]
}

db.serialize(function() {
  let stmt = db.prepare(`INSERT INTO politicians(id, name, party, location, grade_current) VALUES (null, ?, ?, ?, ?)`);

  for (var i = 0; i < politicians.length; i++) {
      stmt.run(politicians[i][0], politicians[i][1], politicians[i][2], politicians[i][3]);
      console.log('Insert new data to politicians table');
  }
  stmt.finalize();

  stmt = db.prepare(`INSERT INTO voters(id, first_name, last_name, gender, age) VALUES (null, ?, ?, ?, ?)`);

  for (var i = 0; i < voters.length; i++) {
    stmt.run(voters[i][0], voters[i][1], voters[i][2], voters[i][3]);
    console.log('Insert new data to voters table');
  }
  stmt.finalize();

  stmt = db.prepare(`INSERT INTO votes(id, voterId, politicianId) VALUES (null, ?, ?)`);

  for (var i = 0; i < votes.length; i++) {
    stmt.run(votes[i][0], votes[i][1]);
    console.log('Insert new data to votes table');
  }

  stmt.finalize();
});
 
db.close();
