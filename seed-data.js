const fs = require('fs')
const sqlite3 = require ('sqlite3')
const db = new sqlite3.Database('poll-db.db')

let seedData = (file_name, table_name) => {
    db.serialize(() => {
        let parsed = fs.readFileSync(file_name, 'utf8').toString().split('\n').map(el => el.split(','))
        for (let i = 1; i < parsed.length; i++) {
            let query = `INSERT INTO ${table_name} (${parsed[0].join(',')})
                        VALUES (${parsed[i].map(el => '?').join(',')})`
            db.run(query, parsed[i], function (err) {
                if (err) console.log(err.message)
                else {
                    console.log(`Success seed to ${table_name}`)
                }
            })
        }
    })

    // let parsed = fs.readFileSync(file_name, 'utf8').toString().split('\n').map(el => el.split(','))
    // var stmt = db.prepare(`INSERT INTO ${table_name} (${parsed[0].join(',')}) VALUES (${parsed[1].map(el => '?').join(',')})`)
    // for (let i = 1; i < parsed.length; i++) {
    //     stmt.run(parsed[i]);
    // }
    // stmt.finalize((err) => {
    //    if (err) console.log(err)
    //    console.log('Success')
    // });

}

seedData('./politicians.csv', 'Politicians')
seedData('./voters.csv', 'Voters')
seedData('./votes.csv', 'Votes')