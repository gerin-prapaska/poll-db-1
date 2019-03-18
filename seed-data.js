const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('database.db')
const fs = require('fs')

function seedData(tableName, fileName) {
    const data = fs.readFileSync(fileName).toString().split('\n').map(x => x.split(','))
    for (let i = 1; i < data.length; i++) {
        let query = `INSERT INTO ${tableName}(${data[0].join(',')})
                     VALUES(${data[i].map(() => '?').join(',')})`
        db.run(query, data[i], function (err) { (err) ? console.log(err.message) : console.log(`DATA ${tableName} SEEDED`) })
    }
}

seedData('politicians', './politicians.csv')
seedData('voters', './voters.csv')
seedData('votes', './votes.csv')