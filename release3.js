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
    const q1 = `SELECT name, party, grade_current
            FROM Politicians
            WHERE Party IS "R" AND grade_current BETWEEN 9 AND 11`;

    db.all(q1,
        (err, data) => {
            if (err) {
                console.log(err);
            } else {
                console.log('No 1.')
                console.log(data)
                console.log(' ')
            }
        }
    )

    const q2 = `SELECT *
            FROM Politicians
            WHERE Party IS "R" AND grade_current BETWEEN 9 AND 11`;

    db.all(q2,
        (err, data) => {
            if (err) {
                console.log(err);
            } else {
                console.log('No 2.')
                console.log(data);
                console.log(' ');
            }
        }
    )

    const q3 = `SELECT count(*) AS "totalVote", name
            FROM Politicians
            JOIN Votes
            ON Politicians.id IS Votes.politician_id
            WHERE Politicians.id IS
                (
                    SELECT id
                    FROM Politicians
                    WHERE name IS "Olympia Snowe"
                )`;

    db.all(q3,
        (err, data) => {
            if (err) {
                console.log(err);
            } else {
                console.log('No 3.')
                console.log(data)
                console.log(' ')
            }
        }
    )

    const q4 = `SELECT name, count(*) AS "totalVote"
                FROM Politicians
                JOIN Votes
                ON Politicians.id IS Votes.politician_id
                WHERE Politicians.name LIKE "Adam %"
                GROUP BY name`

    db.all(q4,
        (err, data) => {
            if (err) {
                console.log(err);
            } else {
                console.log('No 4.')
                console.log(data)
                console.log(' ')
            }
        }
    )

    const q5 = `SELECT count(*) AS "totalVote", name, party, location
                FROM Politicians
                JOIN Votes
                ON Politicians.id IS Votes.politician_id
                GROUP BY name
                ORDER BY totalVote DESC
                LIMIT 3`;

    db.all(q5,
        (err, data) => {
            if (err) {
                console.log(err);
            } else {
                console.log('No 5.')
                console.log(data)
                console.log(' ')
            }
        }
    )

    const q6 = `SELECT first_name, last_name, gender, age
                FROM Voters
                JOIN Votes
                ON Voters.id IS Votes.voter_id
                WHERE Votes.politician_id IS
                    (
                        SELECT id
                        FROM Politicians
                        WHERE name IS "Olympia Snowe"
                    )`;

    db.all(q6,
        (err, data) => {
            if (err) {
                console.log(err);
            } else {
                console.log('No 6.')
                console.log(data)
                console.log(' ')
            }
        }
    )
})

db.close(
    (err) => {
        if (err) {
            return console.error(err.message);
        }
        console.log("Close the database connection.");
    }
);