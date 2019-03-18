const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('poll.db',
    (err) => {
        if (err) {
            return console.error(err.message);
        }
        console.log("Connected to the in-memory poll.db database.");
    }
)

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS Politicians
            (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT,
                party TEXT,
                location TEXT,
                grade_current REAL
            )`);

    db.run(`CREATE TABLE IF NOT EXISTS Voters
            (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                first_name TEXT,
                last_name TEXT,
                gender TEXT,
                age INTEGER
            )`);

    db.run(`CREATE TABLE IF NOT EXISTS Votes
            (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                voter_id INTEGER,
                politician_id INTEGER,
                    FOREIGN KEY (voter_id) REFERENCES Voters (id)
                    FOREIGN KEY (politician_id) REFERENCES Politicians (id)
            )`);
})

db.close(
    (err) => {
        if (err) {
            return console.error(err.message);
        }
        console.log("Close the database connection.");
    }
);