const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('../poll.db')

//
const dynamicCreate = (tablename, data) => {   
    let keys = Object.keys(data)
    let values = Object.values(data)

    let query = `INSERT INTO ${tablename} (${keys.join(',')}) VALUES (${keys.map(() => '?')});`
    db.run(query, values, (err) => {
        (err) ? console.log(`failed to add data, ${err}`) : console.log(`success to add data...`)
    })
}

// dynamicCreate('Politicians', {
//     name : 'Martin',
//     party :'NasDem',
//     location : 'BD0',
//     grade_current :13.08452404
// })

module.exports = dynamicCreate