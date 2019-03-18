const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('../poll.db')

const dynamicUpdate = (tablename, field, value, updatedfield, updatedValue) => {
    const newValues = [updatedValue, value]
    let query = `UPDATE ${tablename} SET ${updatedfield} = ?
                 WHERE ${field} = ?`
    db.run(query, newValues ,(err) => {
        (err) ? console.log(`failed to update data, ${err}`) : console.log(`Update data success....`)
    })
}

// dynamicUpdate('Politicians', 'name', 'Martin', 'name', 'Martin Suhendra')

module.exports = dynamicUpdate