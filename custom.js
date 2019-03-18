const db    = require('./setup');
const args  = process.argv.slice(2);

const CUSTOM_1 = `SELECT name, party, grade_current 
            FROM politicians
            WHERE party="R" AND grade_current BETWEEN 9 AND 11;`;
const CUSTOM_2 =`SELECT COUNT(*) AS totalVote, name
            FROM politicians
            JOIN votes ON politicians.id = votes.politicianID
            WHERE name = "Olympia Snowe";`
const CUSTOM_3 = `SELECT name, COUNT(votes.politicianId) AS totalVote
            FROM politicians
            JOIN votes ON politicians.id = votes.politicianID
            WHERE name LIKE "Adam %"
            GROUP BY name`
const CUSTOM_4 =`SELECT COUNT(votes.politicianId) AS totalVote, name, party, location
            FROM politicians
            JOIN votes ON politicians.id = votes.politicianID
            GROUP BY name
            ORDER BY COUNT(votes.politicianId) DESC LIMIT 3`
const CUSTOM_5 = `SELECT first_name, last_name, gender, age
            FROM voters, politicians
            JOIN votes ON voters.id = votes.voterId AND politicians.id = votes.politicianID
            WHERE politicians.name = 'Olympia Snowe';`

switch(Number(args[0])) {
    case 1:
        db.all(CUSTOM_1, function (err, data) {
            if(err) {
                console.log(err);
            }
            console.log(data);
        });
        break;
    case 2:
        db.all(CUSTOM_2, function (err, data) {
            if(err) {
                console.log(err);
            }
            console.log(data);
        });
        break;
    case 3:
        db.all(CUSTOM_3, function (err, data) {
            if(err) {
                console.log(err);
            }
            console.log(data);
        });
        break;
    case 4:
        db.all(CUSTOM_4, function (err, data) {
            if(err) {
                console.log(err);
            }
            console.log(data);
        });
        break;
    case 5:
        db.all(CUSTOM_5, function (err, data) {
            if(err) {
                console.log(err);
            }
            console.log(data);
        });
        break;
    default:
        console.log(`Command not found`);
        break;
}
