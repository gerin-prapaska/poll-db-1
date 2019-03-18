const sqlite3 = require ('sqlite3')
const db = new sqlite3.Database('poll-db.db')


const create = (table_name, options) => {
    let keys = Object.keys(options)
    let query = `INSERT INTO ${table_name} (${keys.join(',')}) VALUES (${keys.map(el => '?')})`

    db.run(query, Object.values(options), function (err) {
        if (err) console.log(`Error insert to ${table_name}`)
        else console.log(`Successfully inserted new data with ID : ${this.lastID}`)
    })
}

const read = (table_name, options) => {
    let query;
    let arr;
    if (options == null) {
        query = `SELECT * FROM ${table_name}`
        arr = []
    } else {
        query = `SELECT * FROM ${table_name} WHERE ${options.field} = ?`
        arr = [options.value]
    }

    db.all(query, arr, function (err, rows) {
        if (err) console.log(`Error reading ${table_name}`)
        else console.log(rows)
    })
}

const remove = (table_name, options) => {
    let query = `DELETE FROM ${table_name} WHERE ${options.field} = ?`

    db.run(query, [options.value], function (err) {
        if (err) console.log(`Error delete to ${table_name}`)
        else console.log(`Successfully deleted data with ID : ${this.lastID}`)
    })
}

const update = (table_name, options) => {
    let query = `UPDATE ${table_name} SET ${options.field} = ?
                WHERE ${options.wherefield} = ?`

    db.run(query, [options.value, options.wherevalue], function (err) {
        if (err) console.log(`Error update to ${table_name}`)
        else console.log(`Successfully edited data with ID : ${this.lastID}`)
    })
}

// create('Politicians', {
//     name : 'Paul',
//     party : 'Free Party', 
//     location : 'NY',
//     grade_current : 11.5362423
// })

// update('Politicians', {
//     field : "name",
//     value : "Lydwine",
//     wherefield : "name",
//     wherevalue : "Paul"
// })

// remove('Politicians', {
//     field : "name",
//     value : "Lydwine"
// })

read('Voters', null)
read('Voters', {
    field : "first_name",
    value : "Cameron"
})
