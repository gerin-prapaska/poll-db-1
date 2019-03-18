const fs = require('fs')
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.db')

class Voter {
    static readFile() {
        let voters = fs.readFileSync('./voters.csv','utf8').split('\n')
        for(let i = 1; i < voters.length; i++) {
            voters[i]= voters[i].split(',')
        }
        return voters
    }

    static convertToDb() {
        let voters = Voter.readFile()
        db.serialize(function() {
            let input = db.prepare("INSERT INTO voters VALUES (null, ?,?,?,?)")
            for (let i = 1; i < voters.length; i++) {
                let firstName = voters[i][0]
                let lastName = voters[i][1]
                let gender = voters[i][2]
                let age = voters[i][3]

                input.run(firstName,lastName,gender,Number(age))
            }
            input.finalize();
        })
        //db.close();
    }
}

class Politician {
    static readFile() {
        let politicians = fs.readFileSync('./politicians.csv','utf8').split('\n')
        for(let i = 1; i < politicians.length; i++) {
            politicians[i] = politicians[i].split(',')
        }
        return politicians
    }

    static convertToDb() {
        let politicians = Politician.readFile()

        db.serialize(function() {
            let input = db.prepare("INSERT INTO politicians VALUES (null, ?,?,?,?)")
            for (let i = 1; i < politicians.length; i++) {
                let name = politicians[i][0]
                let party = politicians[i][1]
                let location = politicians[i][2]
                let gradeCurrent = Number(politicians[i][3])

                input.run(name,party,location, gradeCurrent)
            }
            input.finalize();
        })
        //db.close();
    }
}

class Votes {
    static readFile() {
        let votes = fs.readFileSync('./votes.csv','utf8').split('\n')
        for(let i = 1; i < votes.length; i++) {
            votes[i] = votes[i].split(',')
        }
        return votes
    }

    static convertToDb() {
        let votes = Votes.readFile()

        db.serialize(function() {
            let input = db.prepare("INSERT INTO votes VALUES (null, ?,?)")
            for (let i = 1; i < votes.length; i++) {
                input.run(votes[i][0], votes[i][1])
            }
            input.finalize();
        })
        db.close();
    }
}


Voter.convertToDb()
Politician.convertToDb()
Votes.convertToDb();



module.exports = db