const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./PollDb.db')
db.serialize(()=>{
    db.run(`CREATE TABLE if not exists 'Politicians' (
        'id'	INTEGER PRIMARY KEY AUTOINCREMENT,
        'name'	TEXT,
        'party'	TEXT,
        'location'	TEXT,
        'grade_current'	INTEGER
    );`)

    db.run(`CREATE TABLE if not exists 'Voters' (
        id	INTEGER PRIMARY KEY AUTOINCREMENT,
        first_name	TEXT,
        last_name	TEXT,
        gender	TEXT,
        age	NUMERIC
    );)`)

    db.run(`Create TABLE if not exists 'Votes' (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        voterId integer,
        politicianId integer,
        FOREIGN KEY(politicianId) REFERENCES Politicians(id),
        FOREIGN KEY(voterId) REFERENCES Voters(id))
         `)
})
//your code here
