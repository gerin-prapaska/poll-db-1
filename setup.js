const sqlite3 = require ('sqlite3')
const db = new sqlite3.Database('poll-db.db')

db.serialize(function() {
    const createPoliticiansQuery = `CREATE TABLE IF NOT EXISTS Politicians
                                    (
                                        id integer primary key autoincrement,
                                        name text,
                                        party text,
                                        location text,
                                        grade_current text
                                    )
                                `
    
    const createVotersQuery = `CREATE TABLE IF NOT EXISTS Voters
                                (
                                    id integer primary key autoincrement,
                                    first_name text,
                                    last_name text,
                                    gender text (6),
                                    age integer (2)
                                )
                            `
    
    const createVotesQuery = ` CREATE TABLE IF NOT EXISTS Votes
                                (
                                    id integer primary key autoincrement,
                                    voterId integer,
                                    politicianId integer,
                                    FOREIGN KEY (voterId) REFERENCES Voters(id)
                                    FOREIGN KEY (politicianId) REFERENCES Politicians(id)
                                )
                            `

    db.run(`DROP TABLE IF EXISTS Politicians`, (err) => {
        if (err) console.log(err)
        else console.log (`[x] politicians`)
    })
    db.run(`DROP TABLE IF EXISTS Voters`, (err) => {
        if (err) console.log(err)
        else console.log (`[x] voters`)
    })
    db.run(`DROP TABLE IF EXISTS Votes`, (err) => {
        if (err) console.log(err)
        else console.log (`[x] votes`)
    })

    db.run(createPoliticiansQuery, function(err) {
        if (err) console.log(err)
        else console.log('[v] politicians')
    })
    db.run(createVotersQuery, function(err) {
        if (err) console.log(err)
        else console.log('[v] voters')
    })
    db.run(createVotesQuery, function(err) {
        if (err) console.log(err)
        else console.log('[v] votes')
    })
})

db.close()