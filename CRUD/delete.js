const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('database.db')

function remove(tableName, options) {
    let [field, value] = options
    let query = `DELETE FROM ${tableName}
                 WHERE ${field} = ?`
    db.run(query, value, function (err) { (err) ? console.log(err.message) : console.log(`DELETE DATA FROM ${tableName}`) })
}

//DELETE POLITICIANS
remove('politicians', ['id', 21])

//DELETE VOTERS
remove('voters', ['id', 151])

//DELETE VOTES
remove('votes', ['id', 164])