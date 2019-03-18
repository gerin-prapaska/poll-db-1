const db = require('./setup.js')
const Table = require('cli-table');

function insertData(tableName, data) {
    let query = `INSERT INTO ${tableName}
                 VALUES (NULL, `
    for(let i = 0; i < data.length; i++) {
        if(typeof data[i] === 'string') {
            query += '"'
        }
        query += data[i]
        if(typeof data[i] === 'string') {
            query += '"'
        }
        if(i !== data.length - 1) {
            query += ', '
        }
    }
    query += ')'

    db.serialize(function() {
        db.run(query, function(err) {
            if(err) throw err
        })
    })
}

function updateData(tableName, columnName, newValue, id) {
    if(typeof newValue === 'string') {
        newValue = `"${newValue}"`
    }
    let query = `UPDATE ${tableName}
                 SET ${columnName} = ${newValue}
                 WHERE id = ${id}`

    db.serialize(function() {
        db.run(query, function(err) {
            if(err) throw err
        })
    })
}

function deleteData(tableName, id) {
    let query = `DELETE FROM ${tableName}
                 WHERE id = ${id}`
    db.serialize(function() {
        db.run(query, function(err) {
            if(err) throw err
        })
    })
}

function resetAutoIncrement(tableName) {
    const maxQuery = `SELECT MAX(id) FROM ${tableName}`
    db.serialize(function() {
        db.all(maxQuery, [], function(err, row) {
            if(err) {
                throw err
            } else {
                db.run(`UPDATE sqlite_sequence
                        SET seq = ${row[0]['MAX(id)']}
                        WHERE name = "${tableName}"`, function(err) {
                    if(err) throw err
                })
            }
        })
    })
}

insertData('politicians', ['Tom And Jerry', 'D', 'IL', 12.5362423])
insertData('politicians', ['Prabowo', 'M', 'CA', 15.12345521])
updateData('politicians', 'name', 'Sandiaga Uno', 21)
deleteData('politicians', 21)
resetAutoIncrement('politicians')

db.serialize(function() {
    db.all(`SELECT name, party, grade_current
            FROM politicians
            WHERE party = 'R'
            AND
            grade_current BETWEEN 9 AND 11`, function(err, rows) {
                if(err) {
                    throw err
                } else {
                    let table = new Table({
                        head: ['Nama', 'Party', 'Grade']
                      , colWidths: [20, 10, 20]
                    });
                    for(let i = 0; i < rows.length; i++) {

                        table.push(
                            [rows[i].name, rows[i].party, rows[i].grade_current]
                        );
                    }
                   
                    console.log(table.toString());  
                    
                }
            })

    db.all(`SELECT * FROM (SELECT COUNT(politicianId) AS totalVote, politicians.name
            FROM votes
            INNER JOIN politicians ON politicians.id = votes.politicianId
            GROUP BY politicians.name)
            WHERE name = 'Olympia Snowe'`, function(err, rows) {
                if(err) {
                    throw err
                } else {
                    let table = new Table({
                        head: ['Total Vote', 'Name']
                      , colWidths: [20, 10]
                    });
                    for(let i = 0; i < rows.length; i++) {

                        table.push(
                            [rows[i].totalVote, rows[i].name]
                        );
                    }
                   
                    console.log(table.toString());  
                    
                }
            })

    db.all(`SELECT * FROM (SELECT politicians.name, COUNT(politicianId) AS totalVote
            FROM votes
            INNER JOIN politicians ON politicians.id = votes.politicianId
            GROUP BY politicians.name)
            WHERE name LIKE 'Adam%'`, function(err, rows) {
                if(err) {
                    throw err
                } else {
                    let table = new Table({
                        head: ['Nama', 'Total Vote']
                      , colWidths: [20, 10]
                    });
                    for(let i = 0; i < rows.length; i++) {
                        table.push(
                            [rows[i].name, rows[i].totalVote]
                        );
                    }
                   
                    console.log(table.toString());  
                }
            })

    db.all(`SELECT COUNT(politicianId) AS totalVote, politicians.name, politicians.party, politicians.location FROM votes
            INNER JOIN politicians ON politicians.id = votes.politicianId
            GROUP BY politicians.name
            ORDER BY totalVote DESC
            LIMIT 3`, function(err, rows) {
                if(err) {
                    throw err
                } else {
                    let table = new Table({
                        head: ['Total Vote', 'Name', 'Party', 'Location']
                      , colWidths: [20, 10, 20, 10]
                    });
                    for(let i = 0; i < rows.length; i++) {

                        table.push(
                            [rows[i].totalVote, rows[i].name, rows[i].party, rows[i].location]
                        );
                    }
                   
                    console.log(table.toString());  
                    
                }
            })

    db.all(`SELECT first_name, last_name, gender, age FROM voters
            INNER JOIN votes ON voters.id = votes.voterId
            INNER JOIN politicians ON votes.politicianId = politicians.id
            WHERE politicians.name = 'Olympia Snowe'`, function(err, rows) {
                if(err) {
                    throw err
                } else {
                    let table = new Table({
                        head: ['first_name', 'last_name', 'gender', 'gender']
                      , colWidths: [20, 10, 20, 10]
                    });
                    for(let i = 0; i < rows.length; i++) {

                        table.push(
                            [rows[i].first_name, rows[i].last_name, rows[i].gender, rows[i].age]
                        );
                    }
                   
                    console.log(table.toString());  
                    
                }
            })
})