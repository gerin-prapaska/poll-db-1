const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./polldb.db');
const fs = require('fs');


let dataPoliticians = fs.readFileSync('./politicians.csv').toString().split('\n');
let dataVoters = fs.readFileSync('./voters.csv').toString().split('\n');
let dataVotes = fs.readFileSync('./votes.csv').toString().split('\n');

db.serialize(function() {
    const seedPoliticians = db.prepare('INSERT INTO politicians (name, party, location, grade_current) VALUES (?, ?, ?, ?);');
    const seedVoters = db.prepare('INSERT INTO voters (first_name, last_name, gender, age) VALUES (?, ?, ?, ?);');
    const seedVotes = db.prepare('INSERT INTO votes (voterId, politicianId) VALUES (?, ?);');

    for (let i = 1; i < dataPoliticians.length; i++) {
        let temp = dataPoliticians[i].split(',');
        seedPoliticians.run(temp[0], temp[1], temp[2], temp[3]);
    }

    seedPoliticians.finalize()

    for (let i = 1; i < dataVoters.length; i++) {
        let temp = dataVoters[i].split(',');
        seedVoters.run(temp[0], temp[1], temp[2], temp[3]);
    }

    seedVoters.finalize();

    for (let i = 1; i < dataVotes.length; i++) {
        let temp = dataVotes[i].split(',');
        seedVotes.run(temp[0], temp[1]);
    }

    seedVotes.finalize();

});



db.close(function(err) {
    if (err) {
        return console.error(err.message);
    };
});