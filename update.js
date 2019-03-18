const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./database.db')
const argv = process.argv.slice(2)
const command = argv[0]
const options = argv.slice(1)

switch (command) {
    case 'Politician':
        let queryPolitician = `
        UPDATE Politicians
        SET
        name = '${options[1]}',
        party = '${options[2]}',
        location = '${options[3]}',
        grade_current = ${options[4]}
        WHERE id = ${options[0]};
        `
        db.run(queryPolitician, err => {
            err ? console.log(err) : console.log('Success update Politician')
        })
        db.close()
        break;
    case 'Voter':
        let queryVoter = `
        UPDATE Voters
        SET
        first_name = '${options[1]}',
        last_name = '${options[2]}',
        gender = '${options[3]}',
        age = ${options[4]},
        WHERE id = ${options[0]}
        `
        db.run(queryVoter, err => {
            err ? console.log(err) : console.log('Success update Voters')
        })
        db.close()
        break;
    case 'Vote':
        let queryVotes = `
        UPDATE Votes
        SET
        voterId = '${options[1]}',
        politicianId = '${options[2]}',
        WHERE id = ${options[0]}
        `
        db.run(queryVotes, err => {
            err ? console.log(err) : console.log('Success update Votes')
        })
        db.close()
        break;
    default:
        break;
}