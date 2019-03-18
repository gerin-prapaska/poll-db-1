/* select politician from party R and gradeCurrent between 9 and 11*/
SELECT * FROM politicians
WHERE gradeCurrent BETWEEN 9 AND 11
	AND party = 'R';



/*count total vote of Olympia Snowe*/
SELECT name, COUNT(*) AS 'total Votes'  FROM votes
JOIN politicians
	ON votes.politicianId = politicians.id
WHERE name = 'Olympia Snowe';


/* Count the votes for politician name containing adam*/
SELECT name, COUNT(*) AS 'Vote Count' FROM politicians

JOIN votes
	ON politicians.id = votes.politicianId
WHERE name LIKE 'Adam %'
GROUP BY name
;


/* returns array with id of voters on olympia snowe */
(SELECT voterId FROM votes
WHERE votes.politicianId = 
(SELECT id FROM politicians
WHERE name = 'Olympia Snowe'));


/*return all Olympia Snowe Voter */
SELECT firstName, lastName, gender, age FROM votes
JOIN politicians
	ON politicians.id = votes.politicianId
JOIN voters
	ON voters.id = votes.voterId
WHERE name = 'Olympia Snowe'
;