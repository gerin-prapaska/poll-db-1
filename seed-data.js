const fs = require('fs')
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./poll.db')

function dynamicSeedData (tablename, filename ) {
    db.serialize(() => {
        const data = fs.readFileSync(filename).toString().split('\n').map(x => x.split(','))
        var stmt = db.prepare(`INSERT INTO ${tablename}(${data[0].join(',')})
                    VALUES(${data[1].map(() => '?').join(',')})`)
        for (let i = 1; i < data.length; i++) {
            stmt.run(data[i])
        }
        stmt.finalize((err) => {
            (err) ? console.log(err) : console.log(`Seeding success....`)
        })
    })
}

dynamicSeedData('Politicians', './politicians.csv')
dynamicSeedData('Voters', './voters.csv')
dynamicSeedData('Votes', './votes.csv')