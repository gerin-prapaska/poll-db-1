const db = require('./setup').db


//Find politician from party R with grade current between 9 - 11
query = `SELECT * FROM politicians
        WHERE gradeCurrent BETWEEN 9 AND 11
        AND party = 'R';`

function queries(query) {
    db.all(query, function (err, result) {
        console.log(result)
        console.log(' ')
    });
}

queries(query);

//count total vote of 'olympia snowe'
query = `SELECT name, COUNT(*) AS 'total Votes'  FROM votes
        JOIN politicians
	        ON votes.politicianId = politicians.id
        WHERE name = 'Olympia Snowe';`

queries(query);


///* Count the votes for politician name containing adam*/

query = `SELECT name, COUNT(*) AS 'Vote Count' FROM politicians
        JOIN votes
	        ON politicians.id = votes.politicianId
        WHERE name LIKE 'Adam %'
        GROUP BY name
        ;`

queries(query);


    /*return all Olympia Snowe Voter */
query = `SELECT firstName, lastName, gender, age FROM votes
        JOIN politicians
            ON politicians.id = votes.politicianId
        JOIN voters
            ON voters.id = votes.voterId
        WHERE name = 'Olympia Snowe'
        ;`  

queries(query);