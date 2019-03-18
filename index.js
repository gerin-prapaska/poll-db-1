const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./polldb.db');

function logErr(err) {
    if (err) console.log('gagal dilakukan');
    else console.log('berhasil dilakukan');
}

function createPolitician(name, party, location, grade_current) {
    db.run(`INSERT INTO politicians (name, party, location, grade_current) VALUES (${name}, ${party}, ${location}, ${grade_current});`, logErr);
};

function createVoters(first_name, last_name, gender, age) {
    db.run(`INSERT INTO voters (first_name, last_name, gender, age) VALUES (${first_name}, ${last_name}, ${gender}, ${age});`, logErr);
};

function createVotes(voterId, politicianId) {
    db.run(`INSERT INTO votes (voterId, politicianId) VALUES (${voterId}, ${politicianId});`, logErr);
};

function updateData(table, id, key, value) {
    db.run(`UPDATE ${table} SET ${key} = ${value} WHERE id = ${id};`, logErr);
};

// function updateVoters(table, id, key, value) {
//     db.run(`UPDATE ${table} SET ${key} = ${value} WHERE id = ${id};`, logErr);
// };

// function updateVotes(table, id, key, value) {
//     db.run(`UPDATE ${table} SET ${key} = ${value} WHERE id = ${id};`, logErr);
// };

function deleteData(table, id) {
    db.run(`DELETE FROM ${table} WHERE id = ${id};`, logErr);
};

// function deleteVoters(table, id) {
//     db.run(`DELETE FROM ${table} WHERE id = ${id};`, logErr);
// };

// function deleteVotes(table, id) {
//     db.run(`DELETE FROM ${table} WHERE id = ${id};`, logErr);
// };


let command = process.argv.slice(2);

switch (command[0]) {
    case 'createPolitician':
        createPolitician(...command.slice(1));
        break;
    case 'createVoter':
        createVoter(...command.slice(1));
        break;
    case 'createVotes':
        createVotes(...command.slice(1));
        break;
    case 'update':
        updateData(...command.slice(1));
        break;
    case 'delete':
        deleteData(...command.slice(1));
        break;
}




// const query = `SELECT name,party,grade_current FROM politicians WHERE party = 'R' AND grade_current BETWEEN 9 AND 11 `;
// const query = `SELECT count(*) AS totalVote, name FROM votes LEFT JOIN politicians ON votes.politicianId = politicians.Id WHERE politicians.name = 'Olympia Snowe'`;

// const query = `SELECT name, count(*) AS totalVote FROM votes
// LEFT JOIN politicians ON votes.politicianId = politicians.Id
// WHERE politicians.name LIKE 'ADAM%'
// GROUP BY 1;`;

const query = `SELECT count(*) AS totalVote, name, party, location
    FROM votes
    LEFT JOIN politicians ON votes.politicianId = politicians.Id
    GROUP BY 2
    ORDER BY totalVote DESC LIMIT 3;
`;

// const query = `SELECT first_name, last_name, gender, age FROM votes 
// JOIN voters ON votes.voterId = voters.Id 
// JOIN politicians ON votes.politicianId = politicians.Id
// WHERE politicians.name = 'Olympia Snowe';`;


db.all(query, function(err, table) {
    if (err) console.log(err);
    else console.log(table);
})