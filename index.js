const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./poll.db')

// ----------------------------------------------
// ------------POLL DB 1 - RELEASE 2-------------
let insertData = function (table, data, cb) {
    db.serialize(function () {
        let sql = `INSERT INTO ${table} VALUES (null, ${data.map(d => `'${d}'`).join(', ')})`
        db.run(sql, cb)
    })
}

let updateData = function (table, id, data) {
    db.serialize(function () {
        let sql = `
            UPDATE ${table}
            SET ${Object.keys(data).map(key => `${key} = '${data[key]}'`).join(', ')}
            WHERE id = ${id}
        ;`

        db.run(sql, function (err) {
            if (err) {
                console.log('Error update data:\n', err)
            } else {
                console.log('Success update data')
            }
        })
    })
}

let deleteData = function (table, id) {
    db.serialize(function () {
        let sql = `
            DELETE FROM ${table}
            WHERE id = ${id}
        ;`

        db.run(sql, function (err) {
            if (err) {
                console.log('Error delete data:\n', err)
            } else {
                console.log('Success delete data')
            }
        })
    })
}

let args = process.argv.slice(2)
let command = args[0]
let table = args[1]
let params = args.slice(2)

let logResult = command => function (err) {
    if (err) {
        console.log(`Error ${command} data:\n`, err)
    } else {
        console.log(`Success ${command} data\n`)
    }
}

switch (command) {
    case 'insert':
        insertData(table, params, logResult('inserting'))
        break
    case 'update':
        let data = params.slice(1).reduce(function (acc, param, i) {
            if (i % 2 === 0) acc[param] = params[i+2]
            return acc
        }, {})
        updateData(table, params[0], data, logResult('updating'))
        break
    case 'delete':
        deleteData(table, params[0], logResult('deleting'))
        break
}

// ------------END OF POLL DB 1 - RELEASE 2-------------
// -----------------------------------------------------
let logRows = function (err, rows) {
    if (err) console.log(err)
    else console.table(rows)
}
let sql
// ----------------------------------------------
// ------------POLL DB 1 - RELEASE 3-------------
// 1.
sql = `
    SELECT name, party, grade_current
    FROM Politicians
    WHERE party = 'R' AND grade_current BETWEEN 9 AND 11 
;`
db.all(sql, logRows)

// 2.
sql = `
    SELECT COUNT(*) AS totalVote, name
    FROM Votes
    JOIN Politicians
        ON Politicians.id = Votes.politicianId
    WHERE name = 'Olympia Snowe'
;`
db.all(sql, logRows)

// 3.
sql = `
    SELECT name, COUNT(*) AS totalVote
    FROM Politicians
    JOIN Votes
        ON Politicians.id = Votes.politicianId
    WHERE Politicians.name LIKE 'ADAM %'
    GROUP BY Politicians.name
;`
db.all(sql, logRows)

// 4.
sql = `
    SELECT COUNT(*) AS totalVote, name, party, location
    FROM Politicians
    JOIN Votes
        ON Politicians.id = Votes.politicianId
    GROUP BY Politicians.name
    ORDER BY totalVote DESC
    LIMIT 3
;`
db.all(sql, logRows)

// 5.
sql = `
    SELECT first_name, last_name, gender, age
    FROM Politicians
    JOIN Voters
        ON Voters.id = Votes.voterId
    JOIN Votes
        ON Politicians.id = Votes.politicianId
    WHERE Politicians.name = 'Olympia Snowe'
;`
db.all(sql, logRows)