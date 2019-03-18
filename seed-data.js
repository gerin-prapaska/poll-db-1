const sqlite3 = require('sqlite3')
const fs = require('fs')
const db = new sqlite3.Database('poll-db-1.db')

const POLITICIANS_FILE = 'politicians.csv'
const VOTERS_FILE = 'voters.csv'
const VOTES_FILE = 'votes.csv'

//insert to politicians
function generatePoliticians(cb) {
    fs.readFile(POLITICIANS_FILE, (err, data) => {
        if(err) {
            console.log('error: '+err)
        }
        else {
            let politicians = data.toString().split('\n').slice(1)
            
            //insert to table
            let insertStmt = `INSERT INTO politicians (name, party, location, grade_current) VALUES `
            let split
            db.serialize(function() {
                politicians.forEach(x => {
                    //validate input from csv
                    if(x !== '') {
                        split = x.split(',')
                        if(split !== undefined && split.length > 1) {
                            let rowStmt = insertStmt + `("${split[0].trim()}", "${split[1].trim()}", "${split[2].trim()}", ${parseFloat(split[3].trim())});`
                                db.run(rowStmt, (err) => {
                                    if(err) {
                                        console.log('error: '+rowStmt);
                                        console.log(err)
                                    }
                                    else {
                                        console.log('successfully create row in politicians table!');
                                    }
                                })
                        }
                    }
                })
            })

            cb(null)

        }
    })
}

function generateVoters(cb) {
    fs.readFile(VOTERS_FILE, (err, data) => {
        if(err) throw err;

        let voters = data.toString().split('\n').slice(1)
        //insert to table
        let insertStmt = `INSERT INTO voters (first_name, last_name, gender, age) VALUES `
        let split
        
        db.serialize(function() {
            voters.forEach(x => {
                if(x !== '') {
                    split = x.split(',')
                    if(split.length > 0) {
                        let rowStmt = insertStmt + `("${split[0].trim()}", "${split[1].trim()}", "${split[2].trim()}", ${Number(split[3].trim())});`
                            db.run(rowStmt, (err) => {
                                if(err) throw err
                                console.log('successfully create row in voters table!');
                            })
                    }
                }
            });
        })

        cb(null)

    })
}

function generateVotes(cb) {
    fs.readFile(VOTES_FILE, (err, data) => {
        if(err) throw err;

        let votes = data.toString().split('\n').slice(1)
        //insert to table
        let insertStmt = `INSERT INTO votes (voter_id, politician_id) VALUES `
        let split
        db.serialize(function() {
            votes.forEach(x => {
                if(x !== '') {
                    split = x.split(',')
                    if(split.length > 0) {
                        let rowStmt = insertStmt + `(${Number(split[0].trim())}, ${Number(split[1].trim())});`
                        db.run(rowStmt, (err) => {
                            if(err) throw err
                            console.log('successfully create row in votes table!');
                        })
                    }
                }
            });
        })

        cb(null)
    })
}

function seed_data() {
        generatePoliticians((err) => {
            if(err){
                console.log(err)
            }
            else {
                generateVoters((err) => {
                    if(err){
                        console.log(err)
                    }
                    else {
                        generateVotes((err) => {
                            if(err) {
                                console.log(err);
                            }
                            else {
                                db.close(()=> {
                                    console.log("DB Close");
                                })
                            }
                        })
                    }
                })
            }
        })
}

//run the code
seed_data()