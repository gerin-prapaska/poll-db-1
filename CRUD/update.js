const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('database.db')

function update(tableName, options) {
    let [whereField, whereValue, updatedField, updatedValue] = options
    let query = `UPDATE ${tableName}
                 SET ${updatedField} = ? 
                 WHERE ${whereField} = ?`
    db.run(query, [updatedValue, whereValue], function (err) { (err) ? console.log(err.message) : console.log(`UPDATED DATA FROM ${tableName}`)})
}

//UPDATE POLITICIANS
update('politicians', ['id', 21, 'party', 'PDIP'])

//UPDATE VOTERS
update('voters', ['id', 151, 'gender', 'Female'])

//UPDATE VOTES
update('votes', ['id', 164, 'politicianId', 20])