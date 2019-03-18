const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('../poll.db')

const dynamicDelete = (tablename, field, value) => {
    let query = `DELETE FROM ${tablename} WHERE ${field} = ?`
    db.run(query, value ,(err) => {
        (err) ? console.log(`failed to delete data, ${err}`) : console.log(`Delete data success....`)
    })
}

// dynamicDelete('Politicians', 'name', 'Martin Suhendra')

module.exports = dynamicDelete