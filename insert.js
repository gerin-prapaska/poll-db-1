const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./database.db')

const argv = process.argv.slice(2)
const command = argv[0]
const options = argv.slice(1)

switch (command) {
    case 'Politician':
        let queryPolitician = `
        INSERT INTO Politicians
        (name,party,location,grade_current)
        VALUES
        ('${options[0]}','${options[1]}','${options[2]}',${options[3]})
        `
        db.run(queryPolitician, err => {
            err ? console.log(err) : console.log('Success add new data')
        })
        db.close()
        break;
    case 'Voter':
        let queryVoter = `
        INSERT INTO Voters
        (first_name,last_name,gender,age)
        VALUES
        ('${options[0]}','${options[1]}','${options[2]}',${options[3]})
        `
        db.run(queryVoter, err => {
            err ? console.log(err) : console.log('Success add new data')
        })
        db.close()
        break;
    case 'Votes':
        let queryVotes = `
        INSERT INTO Votes
        (voterId , politicianId)
        VALUES
        (${options[0]},${options[1]})
        `
        db.run(queryVotes, err => {
            err ? console.log(err) : console.log('Success add new data')
        })
        db.close()
        break;
    default:
        console.log('Wrong command')
        break;
}