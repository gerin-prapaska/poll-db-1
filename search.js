const sqlite3 =require('sqlite3').verbose()
const db = new sqlite3.Database('./database.db')

const release5_1 = `
SELECT * FROM politicians
    WHERE party = 'R'
    AND grade_current BETWEEN 9 AND 11
`
const release5_2 = `
SELECT COUNT(*)AS totalVote,name FROM votes
JOIN politicians
ON votes.politicianId = politicians.id
	WHERE name = "Olympia Snowe"
`

const release5_3 = `
SELECT name ,COUNT(*) AS totalVote FROM votes
JOIN politicians
	ON politicians.id = votes.politicianId
	WHERE name LIKE 'Adam %'
	GROUP BY name
`

const release5_4 = `
SELECT COUNT(politicianId) AS totalVotes , name,party,location FROM votes
JOIN politicians
	ON politicians.id = votes.politicianId
	GROUP BY politicianId
	ORDER BY COUNT (politicianId) desc
	LIMIT 3
`

const release5_5 = `
SELECT first_name,last_name,gender,age FROM votes
JOIN voters
ON voters.id = votes.voterId
JOIN politicians
ON politicians.id = votes.politicianId
WHERE politicians.name = "Olympia Snowe"
`

db.all(release5_1, function(err , data){
    if(err) console.log(err);
    else {console.log(data);
    }
})

db.all(release5_2, function(err , data){
    if(err) console.log(err);
    else {console.log(data);
    }
})

db.all(release5_3, function(err , data){
    if(err) console.log(err);
    else {console.log(data);
    }
})

db.all(release5_4, function(err , data){
    if(err) console.log(err);
    else {console.log(data);
    }
})

db.all(release5_5, function(err , data){
    if(err) console.log(err);
    else {console.log(data);
    }
})

// SELECT name,location,grade_current , COUNT(*) as totalVotes FROM votes
// JOIN politicians
// ON politicians.id = votes.politicianId
// WHERE politicianId IN
// (SELECT id FROM politicians
// 	WHERE grade_current < 9)
//     GROUP BY politicianId
   



// SELECT COUNT(*) AS totalVotes ,first_name , last_name, gender, age FROM voters
// JOIN votes
// ON votes.voterId = voters.id
// GROUP BY first_name
// ORDER BY COUNT(*) DESC