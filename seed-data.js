const fs = require('fs')
const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./poll.db')

let seed = function (file, table, field, cb) {
    fs.readFile(file, 'utf8', function (err, rawData) {
        if (err) {
            console.log('Error read file: ', err)
        } else {
            rawData = rawData.split('\n').slice(1).map(row => row.split(','))
    
            db.serialize(function () {
                let stmt = db.prepare(
                    `INSERT INTO ${table} (${field.join(', ')})
                    VALUES (${field.map(field => '?').join(', ')});`
                )
    
                rawData.forEach(function (row) {
                    stmt.run(row, function (err) {
                        if (err) {
                            console.log('Error run statement', err)
                        }
                    })
                })
    
                stmt.finalize(function (err) {
                    if (err) {
                        console.log('Error finalize: ', err)
                    } else {     
                        console.log(`Success seeding table ${table}`)
                        cb()
                    }
                })
            })
        }
    })
}

seed('./politicians.csv', 'Politicians', ['name', 'party', 'location', 'grade_current'], function () {
    seed('./voters.csv', 'Voters', ['first_name', 'last_name', 'gender', 'age'], function () {
        seed('./votes.csv', 'Votes', ['voterId', 'politicianId'], function () {
            db.close()
        })
    })
})