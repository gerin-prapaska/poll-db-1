const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./poll.db')

db.serialize(() => {
    // 1.
    const query1 = `SELECT name, party, grade_current FROM Politicians
    WHERE party = 'R' AND Politicians.grade_current BETWEEN 9 AND 11`
    
    db.all(query1, (err, data) => {
        (err) ? console.log(err) : console.table(data)
    })
    
    
    //2.
    const query2 = `SELECT COUNT(*) totalVote, name FROM Politicians
    JOIN Votes ON Politicians.id = Votes.politicianId
    WHERE name = 'Olympia Snowe'`
    
    db.get(query2, (err, data) => {
        (err) ? console.log(err) : console.table(data)
    })

    //3.
    const query3 = `SELECT name, COUNT(*) totalVote FROM Politicians
    JOIN Votes ON Politicians.id = Votes.politicianId
    WHERE name LIKE '%Adam%'
    GROUP BY name`

    db.all(query3, (err, data) => {
        (err) ? console.log(err) : console.table(data)
    })

    //4.
    const query4 = `SELECT COUNT(*) totalVote , name, party, location FROM Politicians
    JOIN Votes ON Politicians.id = Votes.politicianId
    GROUP BY name
    ORDER BY totalVote DESC
    LIMIT 3`

    db.all(query4, (err, data) => {
        (err) ? console.log(err) : console.table(data)
    })

    const query5 = `SELECT first_name, last_name, gender, age FROM Votes
    JOIN Politicians
    JOIN Voters ON  Votes.politicianId = Politicians.id AND Votes.voterId = Voters.id 
    WHERE Politicians.name = 'Olympia Snowe';`

    db.all(query5, (err, data) => {
        (err) ? console.log(err) : console.table(data)
    })
})
