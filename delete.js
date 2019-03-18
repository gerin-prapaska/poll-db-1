const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./database.db')

const argv = process.argv.slice(2)
const command = argv[0]
const options = command.slice(1)

switch (command) {
    case 'Politician':
        let queryPolitician = `DELETE FROM Politicians WHERE id = ${options[0]}`
        db.run(queryPolitician, err => {
            err ? console.log(err) : console.log('Success deleted data Politician')
        })
        db.close()
        break;
    case 'Voter':
        let queryVoter = `DELETE FROM Voters WHERE id = ${options[0]}`
        db.run(queryVoter, err => {
            err ? console.log(err) : console.log('Success deleted data Voter')
        })
        db.close()
        break;
    case 'Votes':
        let queryVotes = ` DELETE FROM Votes WHERE id = ${options[0]}`
        db.run(queryVotes, err => {
            err ? console.log(err) : console.log('Success deleted data Votes')
        })
        db.close()
        break;
    default:
        console.log('Wrong Command')
        break;
}