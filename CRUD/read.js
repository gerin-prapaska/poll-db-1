const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('database.db')

function findAll(tableName, options) {
    let [field, value] = []
    let query = `SELECT * FROM ${tableName}`
    if (options) {
        [field, value] = options
        query = `SELECT * FROM ${tableName} WHERE ${field} = ?`
    }
    db.all(query, null || value, function (err, allData) { (err) ? console.log(err.message) : console.log(allData) })
}

function findOne(tableName, options) {
    let [field, value] = options
    let query = `SELECT * 
                 FROM ${tableName} 
                 WHERE ${field} = ?`
    db.get(query, value, function (err, allData) { (err) ? console.log(err.message) : console.log(allData) })
}

//FIND ALL POLITICIANS
findAll('politicians', ['party', 'R'])
//FIND ONE POLITICIAN
findOne('politicians', ['id', 20])


//FIND ALL VOTERS
findAll('voters')
//FIND ONE VOTER
findOne('voters', ['id', 150])


//FIND ALL VOTES
findAll('votes')
//FIND ONE VOTE
findOne('votes', ['id', 163])